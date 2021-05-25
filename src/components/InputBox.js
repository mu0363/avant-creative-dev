import { useEffect, useRef, useState, useCallback } from 'react';
import { PhotographIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/solid';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { ImageModal } from 'src/components/ImageModal';

export const InputBox = () => {
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: '80',
    height: '80',
    aspect: 16 / 9,
  });

  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const trimmingImage = () => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = previewCanvasRef.current.getContext('2d');
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    setShowModal(false);
  };

  const onFilePicker = () => {
    filePickerRef.current.click();
    setImage(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    console.log(`${inputRef.current.value}`);
  };

  const addImage = (e) => {
    setImage(null);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
    // setIsOpen(true);
    setShowModal(true);
  };

  return (
    <div>
      <div className='bg-white p-3 rounded-lg mb-2'>
        <div className='flex space-x-4'>
          <div onClick={onFilePicker}>
            <PhotographIcon className='h-10 text-green-500 hover:bg-gray-200 rounded-full p-2 cursor-pointer' />
            <input
              type='file'
              accept='image/*'
              hidden
              ref={filePickerRef}
              onChange={addImage}
            />
          </div>
          <form className='flex flex-1'>
            <input
              type='text'
              placeholder="What's on your mind?"
              className='bg-gray-100 py-2 px-6 rounded-full focus:outline-none flex-grow'
              ref={inputRef}
            />
            <button hidden onClick={onSubmit}>
              Submit
            </button>
          </form>

          {/* {image && (
            <div className='relative h-56 mt-4'>
              <Image src={image} objectFit='cover' layout='fill' />
            </div>
          )} */}
        </div>
      </div>
      {image && (
        <div className='shadow-lg'>
          <canvas
            ref={previewCanvasRef}
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </div>
      )}
      {showModal && (
        <div>
          <div
            className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            // onClick={closeModal}
          >
            <div className='relative w-auto my-6 mx-auto max-w-xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <XIcon
                    className='h-6 cursor-pointer'
                    onClick={() => setShowModal(false)}
                  />
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
                      className='bg-gray-400 text-white px-6 py-3 rounded-md text-base'
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className='bg-blue-400 text-white px-6 py-3 rounded-md text-base'
                      onClick={trimmingImage}
                    >
                      Crop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </div>
      )}
    </div>
  );
};
