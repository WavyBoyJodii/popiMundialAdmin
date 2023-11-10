import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
}
