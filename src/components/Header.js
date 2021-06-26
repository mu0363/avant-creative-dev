import { useState, useCallback, Fragment } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ViewGridIcon, ChatIcon, BellIcon, ChevronDownIcon, UserIcon } from "@heroicons/react/solid";
import { LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/solid";
import { HeaderRightIcon } from "./HeaderRightIcon";
import { Sling as Hamburger } from "hamburger-react";
import { Menu, Transition } from "@headlessui/react";
import { deleteAllScenes } from "src/features/scenes/scenesSlice";
import { useAuth } from "src/lib/auth";

export const Header = () => {
  const auth = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-1 px-4 md:p-4 sticky top-0 z-10 bg-white shadow-md">
      <Link href="/" className="flex items-center cursor-pointer">
        <a>
          <img
            src="/avant_creative_orange_logo.svg"
            alt="logo"
            className="h-4 md:h-5"
            onClick={() => dispatch(deleteAllScenes())}
          />
        </a>
      </Link>

      <div className="flex items-center">
        <div>
          {/* hidden md:inline-flex */}
          {auth?.user ? (
            <p className="hidden md:inline-flex mr-4">{auth?.user.name}</p>
          ) : (
            <Link href="/login">
              <a>
                <p className="cursor-pointer font-medium border bg-white hover:bg-ai-light hover:text-white py-2 px-5 shadow-sm rounded-sm my-2 md:m-0">
                  Login
                </p>
              </a>
            </Link>
          )}
        </div>
        {auth?.user && (
          <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button>
                  <div>
                    <img
                      src={auth.user?.photoURL}
                      alt="user-image"
                      className="h-9 rounded-full hidden md:inline-flex"
                    />
                    <div className="md:hidden">
                      <Hamburger size={20} />
                    </div>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/videos">
                          <a className="flex items-center w-full px-2 py-2">
                            <ViewGridIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                            My video list
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/login">
                          <a className="flex items-center w-full px-2 py-2">
                            <CogIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                            Setting
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={() => auth.signOut()} className="flex items-center w-full px-2 py-2">
                          <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                          Log out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>
    </header>
  );
};
