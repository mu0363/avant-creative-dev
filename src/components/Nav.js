import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';
import requests from 'src/lib/requests';

export const Nav = () => {
  const router = useRouter();

  return (
    <nav className='hidden lg:inline-flex'>
      <div className='flex justify-between m-3'>
        <div className='flex items-center p-2 bg-gray-200 rounded-full flex-grow'>
          <SearchIcon className='h-5' />
          <input
            type='text'
            className='focus:outline-none bg-transparent ml-1 flex-grow'
          />
        </div>
        <div className='flex items-center space-x-2 ml-4'>
          {Object.entries(requests).map(([key, { title, url }]) => (
            <h2
              onClick={() => router.push(`./?genre=${key}`)}
              key={key}
              className='hover:bg-gray-400 hover:text-white px-3 py-1 rounded-md text-md cursor-pointer'
            >
              {title}
            </h2>
          ))}
        </div>
      </div>
    </nav>
  );
};
