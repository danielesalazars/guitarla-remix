import { useLoaderData } from "@remix-run/react";
import { getGuitarra } from "../models/guitarras.server";
import {
  Guitarras as IGuitarras,
  Guitarra as IGuitarra,
} from "../interfaces/IGuitarra";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data[0]) {
    return [
      { title: `GuitarLA - No encontrada` },
      {
        name: "description",
        content: `Guitarras, Venta de guitarras, guitarra no encontrada`,
      },
    ];
  }
  return [
    { title: `GuitarLA - ${data[0].attributes.nombre}` },
    {
      name: "description",
      content: `Guitarras, Venta de guitarras, guitarra ${data[0].attributes.nombre}`,
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const guitarra = await getGuitarra(params.url);
  //console.log(guitarra.data[0].attributes);
  if (guitarra?.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Guitarra no encontrada",
    });
  }

  return guitarra.data;
};

const guitarras = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const guitarra: IGuitarras[] = useLoaderData();

  const { nombre, description, imagen, precio }: IGuitarra =
    guitarra[0].attributes;

  const descText = description.map(({ children }) =>
    children?.map(({ text }) => text)
  );

  return (
    <div className=" guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`Imagen de la guitarra ${nombre}`}
      />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descText}</p>
        <p className="precio">${precio}</p>
      </div>
    </div>
  );
};

export default guitarras;
