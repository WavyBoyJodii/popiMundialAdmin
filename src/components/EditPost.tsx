import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PostType } from '@/lib/types';
import Editor from './Editor';

export default function EditPost() {
  const [post, setPost] = useState<PostType | undefined>(undefined);

  const params = useParams();

  useEffect(() => {
    async function getPost() {
      const result = await axios.get(
        `https://firstblogbackend-production.up.railway.app/post/${params.postId}`
      );
      console.log(result);
      const fetchedPost: PostType = result.data.post;
      console.log(fetchedPost);

      setPost(fetchedPost);
    }
    getPost();
  }, [params]);

  return <>{post && <Editor post={post} />}</>;
}
