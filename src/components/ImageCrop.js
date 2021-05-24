import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export const ImageCrop = ({ src }) => {
  const [crop, setCrop] = useState({ unit: '%', width: '100', aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onCrop = () => {
    console.log('here we go');
  };

  return (
    <div className='shadow-lg'>
      <ReactCrop
        className='focus:outline-none'
        src={src}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div className='flex justify-end space-x-2 border-t p-3 mt-3'>
        <button
          className='bg-gray-400 text-white px-4 py-2 rounded-md'
          onClick={onCrop}
        >
          Cancel
        </button>
        <button
          className='bg-blue-400 text-white px-4 py-2 rounded-md'
          onClick={onCrop}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
