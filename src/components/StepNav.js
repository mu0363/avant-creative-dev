import { CheckIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const StepNav = ({ stepNum, currentIndex, status }) => {
  return (
    <div
      className={classNames(
        currentIndex !== stepNum - 1 ? 'pr-8 sm:pr-20' : '',
        'relative'
      )}
    >
      {stepNum < currentIndex ? (
        <div>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            <div className='h-0.5 w-full bg-indigo-600' />
          </div>
          <a
            href='#'
            className='relative w-7 h-7 flex items-center justify-center bg-blue-400 rounded-full hover:bg-indigo-900 p-1'
          >
            <CheckIcon className='w-7 h-7 text-white' />
          </a>
        </div>
      ) : (
        <>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            <div className='h-0.5 w-full bg-gray-200' />
          </div>
          <a href='#' className='relative'>
            <p className='bg-gray-300 text-white h-7 w-7 flex items-center justify-center rounded-full font-semibold'>
              {stepNum + 1}
            </p>
          </a>
        </>
        // <div className='grid place-items-center'>
        //   <p className='bg-gray-300 text-white h-7 w-7 flex items-center justify-center rounded-full font-semibold'>
        //     {stepNum + 1}
        //   </p>
        // </div>
      )}
    </div>
  );
};
