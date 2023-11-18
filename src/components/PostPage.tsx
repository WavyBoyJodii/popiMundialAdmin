import Container from './Container';
// import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { PostType, PositiveDeleteResponseType } from '@/lib/types';
import { DateTime } from 'luxon';
import validator from 'validator';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditorOutput from './EditorOutput';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
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

// interface RouteParams {
//   postId: string;
// }

// interface PostPageData {
//   post: PostType;
// }

// export async function loader({ params }) {
//   const result = await axios.get(
//     `https://firstblogbackend-production.up.railway.app/post/${params.postId}`
//   );
//   console.log(result);
//   const post = result.data.post;
//   console.log(post);
//   return { post };
// }

export default function PostPage() {
  const [post, setPost] = useState<PostType | null>(null);
  const params = useParams();

  useEffect(() => {
    async function getPost() {
      const result = await axios.get(
        `https://firstblogbackend-production.up.railway.app/post/${params.postId}`
      );
      console.log(result);
      const fetchedPost = result.data.post;
      console.log(fetchedPost);
      setPost(fetchedPost);
    }
    getPost();
  }, [params]);

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
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  // const { post } = useLoaderData() as PostPageData;
  if (!post) {
    return <p>Loading....</p>;
  }
  const postDate = new Date(post.date_created);
  const dateFormatted = DateTime.fromJSDate(postDate).toLocaleString(
    DateTime.DATE_MED
  );
  const decodedArt = validator.unescape(post.art);
  console.log(decodedArt);
  //   const decodedContent = validator.unescape(post.content);
  //   console.log(JSON.stringify(decodedContent));
  const decodedTitle = validator.unescape(post.title);
  const decodedMediaUrl = validator.unescape(post.mediaUrl);
  return (
    <Container>
      <div className="flex flex-col gap-8 justify-center">
        <h3 className=" text-center place-self-center">{post.genre}</h3>
        <h1 className=" text-5xl font-extrabold text-center">{decodedTitle}</h1>
        <div className="flex justify-center divide-x divide-gray-600">
          <p className=" text-xs text-gray-500 space-y-3 pr-6">
            By: {post.blogger.username}
          </p>
          <p className=" text-xs text-gray-500 space-y-3 pl-6">
            On: {dateFormatted}
          </p>
        </div>
        <div className=" flex justify-center w-full h-1/3">
          <iframe
            width="640"
            height="360"
            src={decodedMediaUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          {/* <img
            src={decodedArt}
            className=" h-full w-full aspect-auto rounded-xl object-cover"
          /> */}
        </div>

        <EditorOutput
          className="p-20 text-base text-center"
          content={post.content}
        />
      </div>

      <div className="flex justify-center gap-8 h-20 mt-2 border-gray-600">
        <Link to={`/edit/${post._id}`}>
          <Button>Edit</Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={'destructive'}>Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deletePost(post._id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Container>
  );
}
// className=""
