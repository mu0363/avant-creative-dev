import { useRef, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { PhotographIcon } from '@heroicons/react/solid';
import { ImageCrop } from './ImageCrop';
import { Button } from 'src/components/Button';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: '100',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  content: {
    margin: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '500px',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

export const InputBox = () => {
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

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
    setIsOpen(true);
  };

  const removeImage = () => {
    setImage(null);
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='bg-white p-3 rounded-lg mb-2'>
        <div>
          <div className='flex space-x-4'>
            <div onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className='h-10 text-green-500 hover:bg-gray-200 rounded-full p-2 cursor-pointer' />
              <input
                type='file'
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
          </div>
          {/* {image && (
            <div className='relative h-56 mt-4'>
              <Image src={image} objectFit='cover' layout='fill' />
            </div>
          )} */}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>
          <ImageCrop src={image} />
          <div className='flex justify-end space-x-2 border-t p-3 mt-3'>
            <Button
              text='Cancel'
              bgColor='bg-gray-400'
              textColor='text-white'
            />
            <Button
              text='Submit'
              bgColor='bg-blue-400'
              textColor='text-white'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
