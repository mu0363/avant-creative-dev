import { CheckCircleIcon as CIOutline } from '@heroicons/react/outline';
import { CheckCircleIcon as CISolid } from '@heroicons/react/solid';

export const StepNav = ({ check, number }) => {
  return (
    <div>
      {check ? (
        <div className='grid place-items-center'>
          <CISolid className='h-6 sm:h-8 text-blue-400' />
          <p className='text-gray-400 text-xs sm:text-base'>{`Step${number}`}</p>
        </div>
      ) : (
        <div className='grid place-items-center'>
          <CIOutline className='h-6 sm:h-8 text-gray-300' />
          <p className='text-gray-300 text-xs sm:text-base'>{`Step${number}`}</p>
        </div>
      )}
    </div>
  );
};
