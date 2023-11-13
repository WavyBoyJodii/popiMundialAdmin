import { Avatar, AvatarFallback } from './ui/avatar';
import { useEffect, useState } from 'react';
import { useLoginStatus } from '@/hooks/useLoginStatus';
// import localforage from 'localforage';
import { Button } from './ui/button';
// w-full sticky top-0
function Header({ className }: { className: string }) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const result = localStorage.getItem('user');
      console.log(result);
      setUsername(result);
    }
    getUser();
  });
  const { dispatch } = useLoginStatus();

  function logout() {
    localStorage.clear();
    dispatch({ type: 'Logout' });
  }

  return (
    <div
      className={`flex justify-between  border-b-2 border-gray-400 ${className}`}
    >
      <div></div>
      <div className="flex gap-4 items-center px-3 py-1">
        <Avatar>
          {username && <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>}
        </Avatar>
        <div className=" flex flex-col justify-center items-center">
          <p>{username}</p>
          <Button onClick={logout} variant={'ghost'} className=" h-8 w-16">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
