import { useLoaderData } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { getGuitarras } from "../models/guitarras.server";
import { getPosts } from "../models/posts.server";
import { getCurso } from "../models/curso.server";
import ListadoGuitarras from "../components/listado-guitarras";
import ListadoPosts from "../components/listado-posts";
import Curso from "../components/curso";
import { Guitarras as IGuitarras } from "../interfaces/IGuitarra";
import { Posts as IPosts } from "../interfaces/IPost";
import { Curso as ICurso } from "../interfaces/ICurso";
import GuitarrasCSS from "../styles/guitarras.css";
import BlogCSS from "../styles/blog.css";
import CursoCSS from "../styles/curso.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: GuitarrasCSS },
    { rel: "stylesheet", href: BlogCSS },
    { rel: "stylesheet", href: CursoCSS },
  ];
};

export const loader = async () => {
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso(),
  ]);
  return { guitarras: guitarras.data, posts: posts.data, curso: curso.data };
};

type UseLoadData = {
  guitarras: IGuitarras[];
  posts: IPosts[];
  curso: ICurso;
};

const Index = () => {
  const { guitarras, posts, curso }: UseLoadData = useLoaderData();
  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras guitarras={guitarras} />
      </main>
      <Curso curso={curso.attributes} />

      <section className="contenedor">
        <ListadoPosts posts={posts} />
      </section>
    </>
  );
};

export default Index;
