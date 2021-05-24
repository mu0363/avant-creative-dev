export const HeaderCenterIcon = ({ Icon }) => {
  return (
    <div className='flex flex-col items-center hover:bg-gray-100 px-4 py-2 rounded-lg cursor-pointer'>
      <Icon className='h-4 hover:text-blue-500 text-gray-500 md:h-6 hidden' />
    </div>
  );
};
