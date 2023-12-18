import { Outlet } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import guitarrasCSS from "../styles/guitarras.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: guitarrasCSS },
];

const Guitarras = () => {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  );
};

export default Guitarras;
