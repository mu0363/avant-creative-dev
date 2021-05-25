import { useState, useRef, useCallback } from 'react';
import { XIcon } from '@heroicons/react/solid';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export const ImageModal = ({
  image,
  closeModal,
  getCropImage,
  setCompletedCrop,
}) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: '80',
    height: '80',
    aspect: 16 / 9,
  });

  const imgRef = useRef(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const trimmingImage = async () => {
    const image = imgRef.current;
    await getCropImage(image);
    closeModal();
  };

  return (
    <>
      <div
        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
        // onClick={closeModal}
      >
        <div className='relative w-auto my-6 mx-auto max-w-xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <XIcon className='h-6 cursor-pointer' onClick={closeModal} />
              <h3 className='text-2xl font-semibold'>Crop image here</h3>
            </div>
            {/*body*/}
            <div className='relative p-6 flex-auto'>
              <ReactCrop
                className='focus:outline-none'
                src={image}
                crop={crop}
                onImageLoaded={onLoad}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                // onComplete={(c) => setCompletedCrop(c)}
              />
              <div className='flex justify-end space-x-2 border-t p-3 mt-2'>
                <button
                  className='bg-gray-400 text-white px-4 py-2 rounded-md'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className='bg-blue-400 text-white px-4 py-2 rounded-md'
                  onClick={trimmingImage}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};
