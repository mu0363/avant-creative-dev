import { v4 as uuidv4 } from 'uuid';

const uploadImages = async (images, avantName) => {
  const id = uuidv4();
  let cloudfrontUrls = [];

  const imageURLs = Object.entries(images).map(([key, value]) => ({ key, value }));

  const urls = await Promise.all(
    imageURLs.map(async (image, index) => {
      //仮のstep番号
      const step = index + 1;
      //redux storeに入れるために仕方なくblobURLにしたものをblobに変更
      let blobFile = await fetch(image.value).then((r) => r.blob());
      //s３はblobをアップロードできないのでファイルに変更
      //https://stackoverflow.com/questions/31831781/uploading-blob-file-to-amazon-s3
      var file = new File([blobFile], 'filename');
      const extension = blobFile.type.slice(6);
      let filepath = '';
      const res = await fetch(`/api/upload-url?id=${id}&extension=${extension}&avant=${avantName}&step=${step}`);
      const { url, fields } = await res.json();
      console.log(fields);
      filepath = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${fields.key}`;
      cloudfrontUrls.push({ [`image${step}`]: filepath });
      const formData = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // console.log(...formData.entries());
      //s3にアップロード
      const upload = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      if (upload.ok) {
        console.log('Uploaded successfully!');
      } else {
        console.error('Upload failed.');
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

export { uploadImages };