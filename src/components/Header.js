import { SearchIcon } from '@heroicons/react/outline';
import {
  HomeIcon,
  FlagIcon,
  PlayIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ViewGridIcon,
  ChatIcon,
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import { HeaderCenterIcon } from 'src/components/HeaderCenterIcon';
import { HeaderRightIcon } from './HeaderRightIcon';

export const Header = () => {
  return (
    <header className='flex items-center p-3 bg-white shadow-md sticky top-0 z-5'>
      <div className='flex items-center'>
        <img
          src='/facebook_logo.png'
          alt='logo'
          className='rounded-full h-10 mr-2'
        />
        <div className='flex items-center bg-gray-100 p-3 rounded-full'>
          <SearchIcon className='h-5 mr-2' />
          <input
            type='text'
            placeholder='Search Facebook'
            className='focus:outline-none bg-transparent hidden'
          />
        </div>
      </div>
      <div className='flex flex-glow justify-center space-x-2 lg:space-x-10'>
        <HeaderCenterIcon Icon={HomeIcon} />
        <HeaderCenterIcon Icon={FlagIcon} />
        <HeaderCenterIcon Icon={PlayIcon} />
        <HeaderCenterIcon Icon={ShoppingCartIcon} />
        <HeaderCenterIcon Icon={UserGroupIcon} />
      </div>
      <div className='items-center space-x-3 hidden md:inline-flex justify-end'>
        <p className='font-medium'>John Doe</p>
        <HeaderRightIcon Icon={ViewGridIcon} />
        <HeaderRightIcon Icon={ChatIcon} />
        <HeaderRightIcon Icon={BellIcon} />
        <HeaderRightIcon Icon={ChevronDownIcon} />
      </div>
    </header>
  );
};
