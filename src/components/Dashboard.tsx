import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className=" flex flex-col h-screen ">
      <div className="flex flex-1 overflow-hidden">
        <SideBar className={'flex w-64 border-r-2'} />
        <div className="flex flex-1 flex-col">
          <Header className="" />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
