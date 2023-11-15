import Container from './Container';
// import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { PostType } from '@/lib/types';
import { DateTime } from 'luxon';
import validator from 'validator';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditorOutput from './EditorOutput';

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
            width="560"
            height="315"
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
    </Container>
  );
}
// className=""
