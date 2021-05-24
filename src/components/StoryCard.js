import Image from 'next/image';

export const StoryCard = ({ story }) => {
  const { name, src, profile } = story;
  return (
    <div className='relative h-14 w-14 lg:w-32 lg:h-56 p-3'>
      <Image
        src={profile}
        width={40}
        height={40}
        objectFit='cover'
        className='absolute z-50 rounded-full top-10 opacity-0 lg:opacity-100'
      />
      <Image
        src={src}
        layout='fill'
        objectFit='cover'
        className='rounded-full lg:rounded-2xl'
      />
      <p className='absolute bottom-4 text-white font-bold opacity-0 lg:opacity-100 truncate'>
        {name}
      </p>
    </div>
  );
};
