import { MetaFunction, useLoaderData } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { getPosts } from "../models/posts.server.js";
import { Posts as IPosts } from "../interfaces/IPost";
import ListadoPosts from "../components/listado-posts";
import BlogCSS from "../styles/blog.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: BlogCSS },
];

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

  return (
    <main className="contenedor">
      <ListadoPosts posts={posts} />
    </main>
  );
};

export default Blog;
