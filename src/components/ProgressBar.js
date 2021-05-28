export const ProgressBar = ({ width, percent }) => {
  return (
    <div>
      <div className={`relative pt-1 w-${width}`}>
        <div className='flex mb-2 items-center justify-between'>
          <div>
            <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200'>
              Task in progress
            </span>
          </div>
          <div className='text-right'>
            <span className='text-xs font-semibold inline-block text-pink-600'>
              {percent}%
            </span>
          </div>
        </div>
        <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200'>
          <div
            style={{ width: `${percent}%` }}
            className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500'
          ></div>
        </div>
      </div>
    </div>
  );
};
