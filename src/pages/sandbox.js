import React from 'react';
import { useForm } from 'react-hook-form';

export default function Sandbox() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(data.imageName[0]);
  };

  const uploadPhoto = async (data) => {
    const file = data.imageName[0];
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-url?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log(...formData.entries());

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      console.log('Uploaded successfully!');
    } else {
      console.log(upload);
      console.error('Upload failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit(uploadPhoto)}>
      <input type="file" {...register('imageName')} />
      <button className="bg-red-400 text-white rounded-md py-2 px-4">Submit</button>
    </form>
  );
}
