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

interface SmallPostProps {
  data: PostType;
}

export default function SmallPost({ data }: SmallPostProps) {
  const decodedArt = validator.unescape(data.art);
  const { toast } = useToast();

  const deletePost = async (id: string) => {
    try {
      const result = await axios.post<PositiveDeleteResponseType>(
        `https://firstblogbackend-production.up.railway.app/user/post/${id}`
      );
      toast({
        description: `${result.data.message}`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card className="flex flex-col w-auto h-auto rounded-3xl outline-0 focus:ring-1 hover:ring-1 ring-current transition duration-300 p-0 hover:cursor-pointer">
      <CardContent className="p-0 relative">
        <img
          src={decodedArt}
          className=" aspect-square object-cover rounded-3xl"
        />
        <div className=" flex flex-col backdrop-filter backdrop-blur-md bg-opacity-50 absolute bottom-0 w-full h-16 rounded-b-3xl   bg-white">
          <p className="text-center p-6  text-sm md:text-base">{data.title}</p>
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
