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
import {
  loginSchema,
  ZLoginSchema,
  PositiveResponseType,
  NegativeResponseType,
} from '@/lib/types';
import axios from 'axios';
// import localforage from 'localforage';
import { useLoginStatus } from '@/hooks/useLoginStatus';
import Container from './Container';

export default function Login() {
  const form = useForm<ZLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { dispatch } = useLoginStatus();

  const onSubmit = async (data: ZLoginSchema) => {
    try {
      const result = await axios.post<PositiveResponseType>(
        'https://firstblogbackend-production.up.railway.app/login',
        data
      );
      console.log(result);
      localStorage.setItem('user', result.data.user.username);
      localStorage.setItem('bearer', result.data.token);
      dispatch({ type: 'Login' });
    } catch (err) {
      if (axios.isAxiosError<NegativeResponseType>(err)) {
        console.log(err);
        const responseString = err.response?.data.info.message;
        if (responseString?.includes('username')) {
          form.setError('username', {
            type: 'server',
            message: responseString,
          });
        } else {
          form.setError('password', {
            type: 'server',
            message: responseString,
          });
        }
      }
    }
  };

  return (
    <Container>
      {' '}
      <div className=" h-screen flex justify-center items-center">
        {' '}
        <div className=" w-1/3 h-1/2 p-10 flex flex-col gap-5 justify-center ">
          <h1 className=" text-lg text-center">Popi Mundial Admin Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                      <Input type="password" required {...field} />
                    </FormControl>
                    <FormDescription>Input Password</FormDescription>
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
