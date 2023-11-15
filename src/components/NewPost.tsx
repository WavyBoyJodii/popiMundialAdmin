import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { newPostSchema, ZNewPostSchema } from '@/lib/types';
import { NewPostPositiveResponse, NegativeResponseType } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import Container from './Container';
import { useCallback, useRef } from 'react';
import type EditorJS from '@editorjs/editorjs';

function NewPost() {
  const form = useForm<ZNewPostSchema>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: '',
      art: '',
      mediaUrl: '',
      content: '',
      tags: '',
      genre: '',
    },
  });

  const ref = useRef<EditorJS>();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;

    const token = localStorage.getItem('bearer');

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
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
  }, []);

  const { toast } = useToast();

  const onSubmit = async (data: ZNewPostSchema) => {
    const token = localStorage.getItem('bearer');
    try {
      const result = await axios.post<NewPostPositiveResponse>(
        'https://firstblogbackend-production.up.railway.app/user/post/create',
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(result);
    } catch (err) {
      if (axios.isAxiosError<NegativeResponseType>(err)) {
        console.log(err);
        toast({
          description: `${err}`,
        });
      }
    }
  };

  return (
    <Container>
      {' '}
      <div className=" h-screen flex justify-center items-center">
        {' '}
        <div className=" w-1/3 h-1/2 p-10 flex flex-col gap-5 justify-center ">
          <h1 className=" text-lg text-center">New Post Form</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>Title of Post</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="art"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Art Url</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                    <FormDescription>
                      Place the Url for the Artwork of the post here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mediaUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media Url</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                    <FormDescription>
                      Place the Url for the Youtube embed here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media Url</FormLabel>
                    <FormControl>
                      <Input id="editor" required {...field}></Input>
                    </FormControl>
                    <FormDescription>
                      Place the Url for the Youtube embed here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="content"
                render={({ field }) => <Editor {...field} />}
              /> */}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default NewPost;
