import { CogIcon } from "@heroicons/react/outline";
import { auth } from "src/lib/firebase";
import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "jpeg",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

const uploadAvatarImage = async (image) => {
  const file = await resizeFile(image);
  const extension = file.name.match(/\.[0-9a-z]+$/i)[0];
  const { uid } = await auth.currentUser;
  const res = await fetch(`/api/upload-avatar?uid=${uid}&extension=${extension}`);
  const { url, fields } = await res.json();

  const filepath = `${process.env.NEXT_PUBLIC_AVATAR_URL}${fields.key}`;
  // console.log(filepath);
  const formData = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // console.log(...formData.entries());
  // s3にアップロード
  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (upload.ok) {
    console.log("Upload successfully!");
    return filepath;
  } else {
    console.error("Upload failed.");
  }
};

export { uploadAvatarImage };
