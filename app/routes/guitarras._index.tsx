import { useLoaderData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";
import { getGuitarras } from "../models/guitarras.server";
import ListadoGuitarras from "../components/listado-guitarras";
import { Guitarras as IGuitarras } from "../interfaces/IGuitarra";

export const meta: MetaFunction = () => [
  { title: "GuitarLA - Tienda de Guitarras" },
  { name: "description", content: "Nuestra colección de guitarras" },
];

export const loader = async () => {
  const guitarras = await getGuitarras();
  return guitarras.data;
};

const Guitarras = () => {
  const guitarras: IGuitarras[] = useLoaderData<typeof loader>();

  return <ListadoGuitarras guitarras={guitarras} />;
};

export default Guitarras;
