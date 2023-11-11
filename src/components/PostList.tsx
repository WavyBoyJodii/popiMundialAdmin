import { PostType } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import SmallPost from './SmallPost';

interface PostListProps {
  posts: PostType[];
}

export default function PostList({ posts }: PostListProps) {
  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>([]);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  //   const [morePosts, setMorePosts] = useState<boolean>(false);

  const displayNextPosts = (numPostsToDisplay: number) => {
    const remainingPosts = allPosts.slice(
      displayedPosts.length,
      displayedPosts.length + numPostsToDisplay
    );
    setDisplayedPosts([...displayedPosts, ...remainingPosts]);
  };

  useEffect(() => {
    setAllPosts(posts);
    if (posts.length > 0) {
      displayNextPosts(6);
    } else {
      setDisplayedPosts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  const loadMorePosts = () => {
    displayNextPosts(6);
  };

  return (
    <div className=" space-y-4 p-4 h-auto">
      <h1 className=" text-2xl mb-6 text-center">Latest Posts</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedPosts.map((post) => (
          <SmallPost key={post._id} data={post} />
        ))}
      </div>
      {displayedPosts.length < allPosts.length && (
        <div className="flex place-content-center p-4">
          <Button variant={'outline'} onClick={() => loadMorePosts()}>
            View More
          </Button>{' '}
        </div>
      )}
    </div>
  );
}
