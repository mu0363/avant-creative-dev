import { useState, useRef } from 'react';
import { PreviewVideoModal } from './PreviewVideoModal';

export const PreviewVideo = ({ video }) => {
  const { id, name, videoSrc, thumbnail, length, resolution, createdAt } =
    video;
  let [isOpen, setIsOpen] = useState(false);
  let cancelButtonRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className='bg-white rounded-md shadow-md'>
      {/* 映像とサイズなどの情報 */}
      <video
        poster={thumbnail}
        src={videoSrc}
        // onMouseOver={(e) => e.target.play()}
        onClick={(e) => e.target.play()}
        onMouseOut={(e) => e.target.pause()}
        preload='metadata'
        muted
        playsInline
      ></video>
      <div className='flex flex-col p-2'>
        <p
          className='text-base font-semibold truncate hover:underline hover:text-ai mb-1 cursor-pointer'
          onClick={openModal}
        >
          {name}
        </p>
        <p className='text-xs text-gray-400'>{`createdAt: ${createdAt}`}</p>

        <div className='flex justify-end space-x-1'>
          <p className='bg-green-400 rounded-md py-1/2 px-2 text-white text-xs'>
            {resolution}
          </p>
          <p className='bg-gray-400 rounded-md py-1/2 px-2 text-white text-xs'>
            {length}
          </p>
        </div>
      </div>

      {/* こっからモーダルだぜ */}
      <PreviewVideoModal
        cancelButtonRef={cancelButtonRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={id}
      >
        <video
          className='rounded-t-lg'
          poster={thumbnail}
          src={videoSrc}
          controls
          preload='metadata'
        ></video>
      </PreviewVideoModal>
    </div>
  );
};
