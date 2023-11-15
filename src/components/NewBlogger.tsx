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
import {
  ZNewBloggerSchema,
  newBloggerSchema,
  NegativeResponseType,
} from '@/lib/types';
import Container from './Container';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';

function NewBlogger() {
  const form = useForm<ZNewBloggerSchema>({
    resolver: zodResolver(newBloggerSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: ZNewBloggerSchema) => {
    try {
      const result = await axios.post(
        'https://firstblogbackend-production.up.railway.app/sign-up',
        data
      );
      console.log(result.data);
      toast({
        description: `${result.data.message}`,
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError<NegativeResponseType>(err)) {
        console.log(err.response);
        console.log(err.message);
        toast({
          description: `${err.message}`,
          variant: 'destructive',
        });
      }
    }
  };
  return (
    <Container>
      <div className=" h-screen flex justify-center items-center">
        <div className=" w-1/3 h-1/2 p-10 flex flex-col gap-5 justify-center ">
          <h1 className=" text-lg text-center">
            Add A Blogger To Our Database
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                    <FormDescription>Input Password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Rockstar@GTA.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Input email address here</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default NewBlogger;
