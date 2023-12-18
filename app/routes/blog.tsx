import { Outlet } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import BlogCSS from "../styles/blog.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: BlogCSS },
];

const Blog = () => {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  );
};

export default Blog;
