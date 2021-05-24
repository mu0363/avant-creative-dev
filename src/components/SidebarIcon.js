export const SidebarIcon = ({ Icon, title }) => {
  return (
    <div className='flex items-center'>
      <Icon className='h-8 mr-2' />
      <p className='hidden md:inline-flex'>{title}</p>
    </div>
  );
};
