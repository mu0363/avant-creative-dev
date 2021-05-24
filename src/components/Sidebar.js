import {
  UserIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  DesktopComputerIcon,
  CalendarIcon,
  ClockIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import { SidebarIcon } from './SidebarIcon';

export const Sidebar = () => {
  return (
    <div className='p-3 mt-5 space-y-4'>
      <SidebarIcon Icon={UserIcon} title='Friend' />
      <SidebarIcon Icon={UserGroupIcon} title='Groups' />
      <SidebarIcon Icon={ShoppingBagIcon} title='Marketplace' />
      <SidebarIcon Icon={DesktopComputerIcon} title='Watch' />
      <SidebarIcon Icon={CalendarIcon} title='Events' />
      <SidebarIcon Icon={ClockIcon} title='Memories' />
      <SidebarIcon Icon={ChevronDownIcon} title='See more' />
    </div>
  );
};
