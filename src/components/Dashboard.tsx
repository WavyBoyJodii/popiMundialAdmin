import Container from './Container';
import { useLoginStatus } from '@/context/LoginStatusContext';
import localforage from 'localforage';
import { Button } from './ui/button';
export default function Dashboard() {
  const { dispatch } = useLoginStatus();

  function logout() {
    localforage.clear();
    dispatch({ type: 'Logout' });
  }
  return (
    <Container>
      <div className=" flex flex-col place-content-center">
        <p className=" text-lg">Dashboard</p>
        <Button onClick={logout} variant={'ghost'} className=" h-12 w-12">
          Logout
        </Button>
      </div>
    </Container>
  );
}
