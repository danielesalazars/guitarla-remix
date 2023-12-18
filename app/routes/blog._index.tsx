import { MetaFunction, useLoaderData } from "@remix-run/react";
import { getPosts } from "../models/posts.server.js";
import { Posts as IPosts } from "../interfaces/IPost";
import ListadoPosts from "../components/listado-posts";

export const meta: MetaFunction = () => [
  { title: "GuitarLA - Nuestro Blog" },
  {
    name: "description",
    content: "GuitarLA, Blog de música y venta de guitarras",
  },
];

export const loader = async () => {
  const posts = await getPosts();
  return posts.data;
};

const Blog = () => {
  const posts: IPosts[] = useLoaderData<typeof loader>();

  return <ListadoPosts posts={posts} />;
};

export default Blog;
