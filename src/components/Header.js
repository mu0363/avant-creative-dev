import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  ViewGridIcon,
  ChatIcon,
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import { HeaderRightIcon } from './HeaderRightIcon';
import { Sling as Hamburger } from 'hamburger-react';

export const Header = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const toggleBurger = useCallback(
    () => setOpen((prevState) => !prevState),
    []
  );

  return (
    <header className='flex items-center justify-between py-1 px-4 md:p-4 sticky top-0 z-0 bg-white shadow-md'>
      <div className='flex items-center'>
        <img
          src='/avant_logo_black_ol.svg'
          alt='logo'
          className='h-8 mr-2 cursor-pointer'
          onClick={() => router.push('/')}
        />
      </div>
      <div className='flex items-center'>
        <div className='items-center space-x-4 hidden md:inline-flex'>
          <HeaderRightIcon Icon={ViewGridIcon} />
          <HeaderRightIcon Icon={ChatIcon} />
          <HeaderRightIcon Icon={BellIcon} />
          <HeaderRightIcon Icon={ChevronDownIcon} />
          <p
            className='hover:underline cursor-pointer font-bold'
            onClick={() => router.push('/signin')}
          >
            サインイン
          </p>
        </div>
        <div className='md:hidden bg-transparent'>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={20}
            color='#ffffff'
          />
        </div>
      </div>
    </header>
  );
};
