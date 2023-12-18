/* eslint-disable react/prop-types */
import { ComponentProps, FC } from "react";
import { Link } from "@remix-run/react";
import { Guitarra as IGuitarra } from "../interfaces/IGuitarra";

type CPGuitarra = ComponentProps<"div">;
type GuitarraProps = CPGuitarra & {
  guitarra: IGuitarra;
};

const Guitarra: FC<GuitarraProps> = ({ guitarra }) => {
  const { description, imagen, precio, url, nombre } = guitarra;

  const descText = description.map(({ children }) =>
    children?.map(({ text }) => text)
  );

  return (
    <div className="guitarra">
      <img
        // eslint-disable-next-line react/prop-types
        src={imagen.data.attributes.formats.medium.url}
        alt={`Imagen guitarra ${nombre}`}
      />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descText}</p>
        <p className="precio">${precio}</p>

        <Link className="enlace" to={`/guitarras/${url}`}>
          Ver producto
        </Link>
      </div>
    </div>
  );
};

export default Guitarra;
