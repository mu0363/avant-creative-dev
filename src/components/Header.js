import { useState, useCallback } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import {
  ViewGridIcon,
  ChatIcon,
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import { HeaderRightIcon } from './HeaderRightIcon';
import { Sling as Hamburger } from 'hamburger-react';

export const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleBurger = useCallback(
    () => setOpen((prevState) => !prevState),
    []
  );

  return (
    <header className='flex items-center justify-between  p-3 bg-white shadow-md sticky top-0 z-5'>
      <div className='flex items-center'>
        <img src='/avant_logo_ol.svg' alt='logo' className='h-6 mr-2' />
      </div>
      <div className='flex items-center'>
        <div className='items-center space-x-3 hidden md:inline-flex'>
          <p className='font-medium'>John Doe</p>
          <HeaderRightIcon Icon={ViewGridIcon} />
          <HeaderRightIcon Icon={ChatIcon} />
          <HeaderRightIcon Icon={BellIcon} />
          <HeaderRightIcon Icon={ChevronDownIcon} />
        </div>
        <div className='md:hidden bg-transparent'>
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        </div>
      </div>
    </header>
  );
};
