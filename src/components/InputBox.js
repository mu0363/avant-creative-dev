import { useRef, useState } from 'react';
import { PhotographIcon } from '@heroicons/react/solid';
import { ImageModal } from 'src/components/ImageModal';

export const InputBox = () => {
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    console.log(`${inputRef.current.value}`);
  };

  const addImage = (e) => {
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

  const closeModal = () => {
    setShowModal(false);
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div>
      <div className='bg-white p-3 rounded-lg mb-2'>
        <div className='flex space-x-4'>
          <div onClick={() => filePickerRef.current.click()}>
            <PhotographIcon className='h-10 text-green-500 hover:bg-gray-200 rounded-full p-2 cursor-pointer' />
            <input type='file' hidden ref={filePickerRef} onChange={addImage} />
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
      {showModal && <ImageModal image={image} closeModal={closeModal} />}
    </div>
  );
};
