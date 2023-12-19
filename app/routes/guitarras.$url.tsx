import { useState } from "react";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getGuitarra } from "../models/guitarras.server";
import {
  Guitarras as IGuitarras,
  Guitarra as IGuitarra,
} from "../interfaces/IGuitarra";
import { Item } from "../interfaces/ICarrito";

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

type CarritoContextType = {
  agregarCarrito: (item: Item) => void;
};

const guitarras = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { agregarCarrito } = useOutletContext<CarritoContextType>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cantidad, setCantidad] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const guitarra: IGuitarras[] = useLoaderData();

  const { nombre, description, imagen, precio }: IGuitarra =
    guitarra[0].attributes;

  const descText = description.map(({ children }) =>
    children?.map(({ text }) => text)
  );

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (cantidad < 1) {
      alert("Debes seleccionar una cantidad");
      return;
    }

    const guitarraSeleccionada: Item = {
      id: guitarra[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    };

    agregarCarrito(guitarraSeleccionada);
  };

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

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select
            id="cantidad"
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          >
            <option value="">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </div>
  );
};

export default guitarras;
