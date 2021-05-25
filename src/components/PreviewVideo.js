import { FilmIcon } from '@heroicons/react/outline';

export const PreviewVideo = ({ video }) => {
  const { id, name, videoSrc, thumbnail, length, resolution } = video;
  return (
    <div>
      <div className='bg-white rounded-md shadow-md'>
        <video
          poster={thumbnail}
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
          src={videoSrc}
          muted
        ></video>
        <div className='flex flex-col p-4'>
          <p className='text-base font-semibold truncate'>{name}</p>
          <div className='flex justify-between items-center mt-3'>
            <div className='flex space-x-2'>
              <p>{`Size: ${resolution}`}</p>
              <p>{`Time: ${length}`}</p>
            </div>
            <div>
              {/* <p>HIT IT!</p> */}
              <FilmIcon className='h-8 ml-1 border text-red-400 border-red-400 p-1 rounded-md cursor-pointer hover:bg-gray-200' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
