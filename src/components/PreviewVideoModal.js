import { useRouter } from "next/router";
import { Fragment } from "react";
import { useAuth } from "src/lib/auth";
import { Dialog, Transition } from "@headlessui/react";
import { FilmIcon } from "@heroicons/react/outline";
import { AiFillCloseCircle } from "react-icons/ai";

export const PreviewVideoModal = (props) => {
  const { children, cancelButtonRef, setIsOpen, isOpen, id } = props;
  const auth = useAuth();
  const router = useRouter();

  const routerHandler = () => {
    if (!auth?.user) {
      router.push({
        pathname: "/login", //URL
        query: { id: id }, //検索クエリ
      });
      setIsOpen(false);
    } else {
      router.push(`/video/${id}`);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={isOpen}
          onClose={setIsOpen}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity backdrop-filter backdrop-blur-sm" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="static inline-block align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-3 bg-transparent">
                {children}
                <div className="px-4 py-3 sm:px-3 bg-gray-100 rounded-b-lg">
                  {/* <Link href={auth?.user ? `/video/${id}` : `/login?id=${id}`} className="sm:flex sm:flex-row-reverse"> */}
                  <div className="sm:flex sm:flex-row-reverse" onClick={routerHandler}>
                    {auth?.user ? (
                      <div className="flex items-center w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-ai text-base font-medium text-white space-x-2 hover:bg-ai-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
                        <FilmIcon className="h-5" />
                        <p>Create Video</p>
                      </div>
                    ) : (
                      <div className="flex items-center w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-ai text-base font-medium text-white space-x-2 hover:bg-ai-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
                        {/* <FilmIcon className="h-5" /> */}
                        <p>ログインしてビデオを作る!</p>
                      </div>
                    )}
                  </div>
                  <div
                    ref={cancelButtonRef}
                    className="absolute top-0 right-0 rounded-full bg-white cursor-pointer shadow-lg"
                  >
                    <AiFillCloseCircle
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="sm:h-8 sm:w-8 h-7 w-7"
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
