import { cssBundleHref } from "@remix-run/css-bundle";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import appStylesHref from "./styles/index.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { FC, ReactNode } from "react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: "GuitarLA - Remix",
    },
  ];
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "true",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
  },
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
type DocumentProps = {
  children: ReactNode;
};

const Document: FC<DocumentProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

// ! MANEJO DE ERRORES (Paginas no existentes, etc)
export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">
          Status: {error.status} - {error.statusText}
        </p>
        <Link className="error-enlace" to="/">
          Tal vez quieras volver a la página principal
        </Link>
      </Document>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Document>
      <p className="error">{errorMessage}</p>
      <Link className="error-enlace" to="/">
        Tal vez quieras volver a la página principal
      </Link>
    </Document>
  );
}
