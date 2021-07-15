import { auth } from "src/lib/firebase";
import { storage } from "src/lib/firebase";
import { resizeFile } from "src/lib/resizeFile";
import { generateId } from "src/lib/generateId";

export const uploadImages = async (images, avantName) => {
  const id = generateId();
  let cloudfrontUrls = [];
  //slice入れたらうまくsortされた...reduxの値を直接ソートしようとしてもfreezeしてるので新たな変数に入れてあげる
  //https://stackoverflow.com/questions/53420055/error-while-sorting-array-of-objects-cannot-assign-to-read-only-property-2-of/53420326
  const sortedImages = images.slice().sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  });
  const imageURLs = sortedImages.map((image) => {
    const value = Object.values(image);
    return value[1];
  });

  const urls = await Promise.all(
    imageURLs.map(async (image, index) => {
      // 仮のstep番号;
      const step = index + 1;
      // redux storeに入れるために仕方なくblobURLにしたものをblobに変更
      let blobFile = await fetch(image).then((r) => r.blob());
      // s３はblobをアップロードできないのでファイルに変更
      //https://stackoverflow.com/questions/31831781/uploading-blob-file-to-amazon-s3
      var file = new File([blobFile], "filename");
      const extension = blobFile.type.slice(6);
      let filepath = "";
      const res = await fetch(`/api/upload-images?id=${id}&extension=${extension}&avant=${avantName}&step=${step}`);
      const { url, fields } = await res.json();

      filepath = `${process.env.NEXT_PUBLIC_IMAGES_CLOUDFRONT_URL}${fields.key}`;
      cloudfrontUrls.push({ [`image${step}`]: filepath });
      const formData = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // console.log(...formData.entries());
      //s3にアップロード
      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (upload.ok) {
        console.log("Uploaded successfully!");
      } else {
        console.error("Upload failed.");
      }
      //////////////////////////////////////////////////
      //三回返しちゃうのやだなー
      //////////////////////////////////////////////////
      return cloudfrontUrls;
      //この後イメージキャッシュをクリアするといいよ🥺
    })
  );
  return { urls, id };
};

export const uploadAvatarImage = async (image) => {
  const file = await resizeFile(image);
  const extension = file.name.match(/\.[0-9a-z]+$/i)[0];
  const id = generateId();
  const { uid } = await auth.currentUser;
  const filename = `${uid}-${id}${extension}`;
  const uploadTask = storage.ref("vod-avatar-images").child(filename);
  await uploadTask.put(file);
  const fileUrl = await uploadTask.getDownloadURL();
  return fileUrl;
};

export const deleteAvatarImage = async () => {
  const { photoURL } = await auth.currentUser;
  const result = photoURL.split("%2F")[1].split("?")[0];
  const filepath = `vod-avatar-images/${result}`;
  let storageRef = storage.ref();
  const desertRef = storageRef.child(filepath);
  await desertRef.delete();
};
