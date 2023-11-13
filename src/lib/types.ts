import * as z from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Must Be atleast 3 characters long')
    .toLowerCase(),
  password: z.string().min(7, 'Password must be atleast 7 characters long'),
});

export const newPostSchema = z.object({
  title: z.string().min(1, 'Post must have a Title'),
  art: z.string().url({ message: 'Invaid Url' }),
  mediaUrl: z.string().url({ message: 'Invaid Url' }),
  content: z.any(),
  tags: z.string().optional(),
  genre: z.string().min(1, 'Post must have a genre'),
});

export type ZLoginSchema = z.infer<typeof loginSchema>;

export type ZNewPostSchema = z.infer<typeof newPostSchema>;

export interface BloggerType {
  username: string;
  password: string;
  email: string;
  admin: boolean;
}

export interface UserType extends BloggerType {
  _id: string;
  admin: boolean;
  __V: number;
}
export interface PositiveResponseType {
  user: UserType;
  token: string;
}

export interface NewPostPositiveResponse {}

export interface PositiveDeleteResponseType {
  message: string;
}

export interface AxiosErrorMessage {
  message: string;
}

export interface NegativeResponseType {
  info: AxiosErrorMessage;
}

export interface PostType {
  _id: string;
  title: string;
  art: string;
  mediaUrl: string;
  content: string;
  date_created: Date;
  tags: string[];
  genre: string;
  blogger: BloggerType;
  __v: number;
}
