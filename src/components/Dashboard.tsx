import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className=" flex flex-col h-screen">
      <Header />
      <div className=" flex flex-row h-full">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
