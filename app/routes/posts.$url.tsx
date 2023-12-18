import { getPost } from "../models/posts.server";
import { Posts as IPosts, Post as IPost } from "../interfaces/IPost";
import { formatearFecha } from "../utils/helpers";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import BlogCSS from "../styles/blog.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: BlogCSS },
];

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data[0]) {
    return [
      { title: `GuitarLA - Post no encontrada` },
      {
        name: "description",
        content: `Guitarras, Venta de guitarras, post no encontrada`,
      },
    ];
  }
  return [
    { title: `GuitarLA - ${data[0].attributes.titulo}` },
    {
      name: "description",
      content: `Guitarras, Venta de guitarras, post ${data[0].attributes.titulo}`,
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const post = await getPost(params.url);
  if (post?.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Post no encontrada",
    });
  }
  return post.data;
};

const Posts = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const post: IPosts[] = useLoaderData();

  const { titulo, contenido, imagen, publishedAt }: IPost = post[0].attributes;

  const contenidoText: string[] = [];

  contenido.map(({ children }) =>
    children?.map(({ text }) => {
      contenidoText.push(text);
    })
  );

  return (
    <article className="contenedor post mt-3">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`Imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        {contenidoText.map((content, i) => (
          <p key={i} className="texto">
            {content}
          </p>
        ))}
        {/* <p className="texto">{contenidoText}</p> */}
      </div>
    </article>
  );
};

export default Posts;
