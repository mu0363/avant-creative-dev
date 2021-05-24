import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export const ImageCrop = ({ src }) => {
  const [crop, setCrop] = useState({ unit: '%', width: '30', aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  return (
    <div className='shadow-lg'>
      <ReactCrop
        className='focus:outline-none'
        src={src}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
    </div>
  );
};
