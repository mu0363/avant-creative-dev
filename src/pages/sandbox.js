import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

//Thanks
//https://stackoverflow.com/questions/62845793/how-can-i-upload-file-to-s3-using-next-js-with-zeit-now-and-formidable-serverles
export default function Sandbox() {
  const { register, handleSubmit } = useForm();
  const avantName = 'avant001';
  const id = uuidv4();
  let cloudfrontUrls = [];

  const uploadPhoto = async (files) => {
    const images = [];
    Object.entries(files).forEach(([key, value]) => {
      images.push({ key, value });
    });
    images.map(async (image, index) => {
      const file = image.value[0];
      console.log(file);
      const filename = file.name;
      const step = index + 1;

      //Cloud frontのファイパスをapiフェッチしたfieldsからゲットするぞ
      let filepath = '';
      const res = await fetch(`/api/upload-url?id=${id}&file=${filename}&avant=${avantName}&step=${step}`);
      const { url, fields } = await res.json();
      filepath = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${fields.key}`;
      //keyに変数入れたい場合は[]で囲うとといいらしいよ！
      //https://qiita.com/kmagai/items/95481a3b9fd97e4616c9
      cloudfrontUrls.push({ [`image${index + 1}`]: filepath });
      console.log(cloudfrontUrls);
      const formData = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log(...formData.entries());

      // //s3にアップロード
      // const upload = await fetch(url, {
      //   method: 'POST',
      //   body: formData,
      // });
      // if (upload.ok) {
      //   console.log('Uploaded successfully!');
      // } else {
      //   console.error('Upload failed.');
      // }
      // //この後イメージキャッシュをクリアするといいよ🥺
    });
    //////////////////////////////////////////////////////
    // ------------- this is working !!! ----------
    // const file = files.step1[0];
    // const filename = file.name;
    // const res = await fetch(`/api/upload-url?file=${filename}&avant=${avantName}&step=${step}`);
    // const { url, fields } = await res.json();
    // const formData = new FormData();
    // Object.entries({ ...fields, file }).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    // console.log(...formData.entries());
    // const upload = await fetch(url, {
    //   method: 'POST',
    //   body: formData,
    // });
    // if (upload.ok) {
    //   console.log('Uploaded successfully!');
    // } else {
    //   console.error('Upload failed.');
    // }
    // ------------- end --------------------------
    //////////////////////////////////////////////////////
  };

  return (
    <div>
      <form onSubmit={handleSubmit(uploadPhoto)}>
        <div className="flex flex-col space-y-2">
          <div>
            <label>picture1</label>
            <input type="file" {...register('step1')} />
          </div>
          <div>
            <label>picture2</label>
            <input type="file" {...register('step2')} />
          </div>
          <div>
            <label>picture3</label>
            <input type="file" {...register('step3')} />
          </div>
        </div>
        <button className="bg-red-400 text-white rounded-md py-2 px-4 mt-5">Submit</button>
      </form>
    </div>
  );
}
