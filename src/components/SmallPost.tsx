import { PostType, PositiveDeleteResponseType } from '@/lib/types';
import { Card, CardContent } from './ui/card';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

interface SmallPostProps {
  data: PostType;
}

export default function SmallPost({ data }: SmallPostProps) {
  const decodedArt = validator.unescape(data.art);
  const { toast } = useToast();
  const navigate = useNavigate();

  const deletePost = async (id: string) => {
    const token = localStorage.getItem('bearer');
    try {
      const result = await axios.delete<PositiveDeleteResponseType>(
        `https://firstblogbackend-production.up.railway.app/user/post/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        description: `${result.data.message}`,
      });
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card className="flex flex-col w-auto h-auto rounded-3xl outline-0">
      <CardContent className="p-0 relative">
        <img
          src={decodedArt}
          className=" aspect-square object-cover rounded-3xl"
        />
        <div className=" flex flex-col backdrop-filter backdrop-blur-md bg-opacity-50 absolute bottom-0 w-full h-16 rounded-b-3xl bg-white">
          <p className="text-center p-6 text-xs md:text-sm lg:text-base">
            {data.title}
          </p>
          <div className="flex justify-around">
            <Link to={`/edit/${data._id}`}>
              <Button>Edit</Button>
            </Link>
            <Link to={`/post/${data._id}`}>
              <Button>View</Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deletePost(data._id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
