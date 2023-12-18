import { LinksFunction, MetaFunction } from "@remix-run/node";
import Imagen from "../../public/img/nosotros.jpg";
import nosotrosCSS from "../styles/nosotros.css";

export const meta: MetaFunction = () => [
  { title: "GuitarLA - Sobre nosotros" },
  { name: "description", content: "Venta de guitarras, blog de música" },
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: nosotrosCSS },
  { rel: "preload", href: Imagen, as: "image" },
];

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={Imagen} alt="Imagen sobre nosotros" />

        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            culpa expedita mollitia laborum asperiores eaque illum pariatur
            repudiandae, distinctio neque labore praesentium ipsum eos minus
            quisquam itaque eligendi sapiente nemo.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            culpa expedita mollitia laborum asperiores eaque illum pariatur
            repudiandae, distinctio neque labore praesentium ipsum eos minus
            quisquam itaque eligendi sapiente nemo.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
