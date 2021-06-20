import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ViewGridIcon, ChatIcon, BellIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { HeaderRightIcon } from './HeaderRightIcon';
import { Sling as Hamburger } from 'hamburger-react';
import { deleteAllState } from 'src/redux/scenes';

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const toggleBurger = useCallback(() => setOpen((prevState) => !prevState), []);

  return (
    <header className="flex items-center justify-between py-1 px-4 md:p-4 sticky top-0 z-10 bg-white shadow-md">
      <Link href="/" className="flex items-center cursor-pointer">
        <a>
          <img
            src="/avant_creative_orange_logo.svg"
            alt="logo"
            className="h-4 md:h-5 mr-2"
            onClick={() => dispatch(deleteAllState())}
          />
        </a>
      </Link>
      <div className="flex items-center">
        <div className="items-center space-x-2 hidden md:inline-flex">
          <Link href="/videos">
            <a>
              <HeaderRightIcon Icon={ViewGridIcon} />
            </a>
          </Link>
          <HeaderRightIcon Icon={ChatIcon} />
          <HeaderRightIcon Icon={BellIcon} />
          <HeaderRightIcon Icon={ChevronDownIcon} />
          <p
            className="cursor-pointer font-medium hover:bg-gray-100 py-2 px-5 rounded-sm"
            onClick={() => router.push('/login')}
          >
            Login
          </p>
          <p
            className="cursor-pointer font-medium border bg-white hover:bg-ai-light hover:text-white py-2 px-5 shadow-sm rounded-sm"
            onClick={() => router.push('/signup')}
          >
            Sign up
          </p>
        </div>
        <div className="md:hidden bg-transparent">
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} color="#3e3a39" />
        </div>
      </div>
    </header>
  );
};
