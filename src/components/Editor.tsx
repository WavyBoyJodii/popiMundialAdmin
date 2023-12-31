import { useCallback, useRef, useEffect } from 'react';
import type EditorJS from '@editorjs/editorjs';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { newPostSchema, ZNewPostSchema } from '@/lib/types';
import { NewPostPositiveResponse, NegativeResponseType } from '@/lib/types';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import Container from './Container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { DevTool } from '@hookform/devtools';
import { PostType } from '@/lib/types';
import validator from 'validator';

interface EditorProps {
  post?: PostType;
}

export default function Editor({ post }: EditorProps) {
  const decodedTitle = post ? validator.unescape(post.title) : '';
  const decodedMediaUrl = post ? validator.unescape(post.mediaUrl) : '';
  const decodedArt = post ? validator.unescape(post.art) : '';
  const decodedTags = post ? validator.unescape(post.tags.toString()) : '';

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZNewPostSchema>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: decodedTitle,
      art: decodedArt,
      mediaUrl: decodedMediaUrl,
      content: null,
      tags: decodedTags,
      genre: post?.genre,
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const isReady = useRef(false);
  const editorRef = useRef<EditorJS>();
  //   const { toast } = useToast();
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const blocksArray = post ? post.content.blocks : [];
    console.log(blocksArray);
    const token = localStorage.getItem('bearer');

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          editorRef.current = editor;
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: blocksArray },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint:
                'https://firstblogbackend-production.up.railway.app/user/link',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [post]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };
    if (!isReady.current) {
      init();
      isReady.current = true;

      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [initializeEditor]);
  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: `Something went wrong. ${_key}`,
          description: (value as { message: string }).message,
          variant: 'destructive',
        });
      }
    }
  }, [errors, toast]);

  const onSubmit = async (data: ZNewPostSchema) => {
    const token = localStorage.getItem('bearer');
    const blocks = await editorRef.current?.save();
    // const tagsString = data.tags?.toString();
    // const tagsArray = tagsString?.split(' ');
    const payload: ZNewPostSchema = {
      title: data.title,
      art: data.art,
      mediaUrl: data.mediaUrl,
      genre: data.genre,
      content: blocks,
      tags: data.tags,
    };
    console.log(payload);

    try {
      if (!post) {
        const result = await axios.post<NewPostPositiveResponse>(
          'https://firstblogbackend-production.up.railway.app/user/post/create',
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(result.data);
        toast({
          description: `New Post Titled ${payload.title} created `,
        });
        navigate('/');
      } else {
        const updatePostResult = await axios.put<NewPostPositiveResponse>(
          `https://firstblogbackend-production.up.railway.app/user/post/${post._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(updatePostResult.data);
        toast({
          description: `Post Titled ${payload.title} has been updated`,
        });
        navigate('/');
      }
    } catch (err) {
      if (axios.isAxiosError<NegativeResponseType>(err)) {
        console.log(err.response);
        console.log(err.message);
        toast({
          description: `${err}`,
        });
      }
    }
  };

  return (
    <div className="flex flex-1 overflow-y-auto px-4">
      <Container>
        <div className=" h-screen flex justify-center items-center">
          {' '}
          <div className=" h-1/2 p-10 flex flex-col gap-5 justify-center items-center w-3/4">
            <h1 className=" text-lg text-center">New Post Form</h1>
            <form
              className="flex flex-col gap-5 w-3/4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  {...register('title')}
                  id="title"
                  placeholder="Title of Post"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="art">Artwork Url</Label>
                <Input
                  id="art"
                  placeholder="Place URL of artwork here"
                  {...register('art')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="mediaUrl">Media Url</Label>
                <Input
                  id="mediaUrl"
                  placeholder="Place embed URL of Youtube video here"
                  {...register('mediaUrl')}
                />
              </div>
              <div
                id="editor"
                className=" min-w-full border-gray-500 max-h-60 overflow-y-auto"
                {...register('content')}
              />
              <div className="flex flex-col gap-2">
                <Controller
                  control={control}
                  name="genre"
                  render={({ field }) => {
                    return (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose Genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dembow">Dembow</SelectItem>
                          <SelectItem value="Reggaeton">Reggaeton</SelectItem>
                          <SelectItem value="Trap">Trap</SelectItem>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Place tags here"
                  {...register('tags')}
                />
              </div>
              <Button>Create Post</Button>
            </form>
            <DevTool control={control} />
          </div>
        </div>
      </Container>
    </div>
  );
}
