import { Link } from "@remix-run/react";
import { ComponentProps, FC } from "react";
import { Post as IPost } from "../interfaces/IPost";
import { formatearFecha } from "../utils/helpers";
type CPPost = ComponentProps<"div">;
type PostProps = CPPost & {
  post: IPost;
};

const Post: FC<PostProps> = ({ post }) => {
  const { contenido, imagen, titulo, url, publishedAt } = post;

  const contenidoText = contenido.map(({ children }) =>
    children?.map(({ text }) => text)
  );
  return (
    <article className="post">
      <img
        className="imagen"
        src={imagen.data.attributes.formats.small.url}
        alt={`Imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="resumen">{contenidoText}</p>
        <Link className="enlace" to={`/blog/${url}`}>
          Leer Posts
        </Link>
      </div>
    </article>
  );
};

export default Post;
