import { Fragment } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ViewGridIcon, ChatIcon, BellIcon, ChevronDownIcon, UserIcon, CogIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { Sling as Hamburger } from "hamburger-react";
import { Menu, Transition } from "@headlessui/react";
import { deleteAllScenes } from "src/features/scenes/scenesSlice";
import { useAuth } from "src/lib/auth";

export const Header = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const routerHandler = () => {
    router.push("/");
    dispatch(deleteAllScenes());
  };

  return (
    <header className="flex items-center justify-between py-1 px-4 md:p-4 sticky top-0 z-10 bg-white shadow-md">
      <div className="flex items-center cursor-pointer" onClick={routerHandler}>
        <img src="/avant_creative_orange_logo.svg" alt="logo" className="h-4 md:h-5" />
      </div>

      <div className="flex items-center">
        <div>
          {/* hidden md:inline-flex */}
          {auth?.user ? (
            <div className="text-right">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button>
                    <div>
                      {auth?.user.photoURL ? (
                        <img
                          src={auth?.user.photoURL}
                          alt="user-image"
                          className="h-9 rounded-full hidden md:inline-flex"
                        />
                      ) : (
                        <UserIcon className="h-10 bg-gray-200 text-gray-400 rounded-full p-1 hidden md:inline-flex" />
                      )}
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
                  <Menu.Items className="absolute w-max right-0 mt-2 origin-top-right focus:outline-none">
                    <div className="bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div className="flex items-center p-4">
                              {auth?.user.photoURL ? (
                                <img src={auth?.user.photoURL} alt="user-image" className="h-10 rounded-full mr-2" />
                              ) : (
                                <UserIcon className="h-10 bg-gray-200 text-gray-400 rounded-full p-1 mr-2" />
                              )}

                              <div className="bg-white">
                                <p className="font-bold text-base">{auth?.user.name}</p>
                                <p className="text-xs">{auth?.user.email}</p>
                              </div>
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="font-Kosugi">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-200" : "text-gray-700"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm transition duration-200 ease-in-out`}
                                onClick={() => router.push("/videos")}
                              >
                                {active ? (
                                  <ViewGridIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                ) : (
                                  <ViewGridIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                )}
                                映像一覧
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-200" : "text-gray-700"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm transition duration-200 ease-in-out`}
                                // onClick={() => router.push("/videos")}
                              >
                                {active ? (
                                  <CogIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                ) : (
                                  <CogIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                )}
                                <span>設定</span>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-200" : "text-gray-700"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm transition duration-200 ease-in-out`}
                                onClick={() => auth.signOut()}
                              >
                                {active ? (
                                  <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                ) : (
                                  <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                )}
                                <span>ログアウト</span>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </div>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
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
      </div>
    </header>
  );
};
