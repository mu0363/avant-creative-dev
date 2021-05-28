import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FilmIcon, XIcon } from '@heroicons/react/outline';

export const PreviewVideoModal = ({
  children,
  cancelButtonRef,
  setIsOpen,
  isOpen,
}) => {
  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          open={isOpen}
          onClose={setIsOpen}
        >
          <div className='flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='static inline-block align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-3 bg-transparent'>
                {children}
                <div className='bg-gray-100 rounded-b-lg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <div className='flex items-center w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#e47f5a] text-base font-medium text-white space-x-2 hover:bg-[#d36644] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer'>
                    <FilmIcon className='h-5' />
                    <button type='button' onClick={() => setIsOpen(false)}>
                      Create Video
                    </button>
                  </div>
                  <div
                    ref={cancelButtonRef}
                    className='absolute top-0 right-0 rounded-full border border-gray-400 shadow-md bg-white p-1 cursor-pointer'
                  >
                    <XIcon
                      type='button'
                      onClick={() => setIsOpen(false)}
                      className='h-5'
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

// <div className='sm:flex sm:items-start'>
// <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
//   <ExclamationIcon
//     className='h-6 w-6 text-red-600'
//     aria-hidden='true'
//   />
// </div>
// <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
//   <Dialog.Title
//     as='h3'
//     className='text-lg leading-6 font-medium text-gray-900'
//   >
//     Deactivate account
//   </Dialog.Title>
//   <div className='mt-2'>
//     <p className='text-sm text-gray-500'>
//       Are you sure you want to deactivate your account? All
//       of your data will be permanently removed. This action
//       cannot be undone.
//     </p>
//   </div>
// </div>
// </div>
