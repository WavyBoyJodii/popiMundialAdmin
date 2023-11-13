import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { PostType } from '@/lib/types';
import PostList from './PostList';

function Home() {
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const result: AxiosResponse = await axios.get<PostType[]>(
          'https://firstblogbackend-production.up.railway.app/posts'
        );
        console.log(result);
        const allPosts: PostType[] = result.data.allPosts;
        console.log(allPosts);
        setLatestPosts(allPosts);
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, []);
  return (
    <div className=" flex flex-1 overflow-y-auto px-4 justify-center">
      <PostList posts={latestPosts} />
    </div>
  );
}

export default Home;
