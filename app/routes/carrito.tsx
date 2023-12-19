/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { MetaFunction, useOutletContext } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import { Item } from "../interfaces/ICarrito";
import CarritoCSS from "../styles/carrito.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: CarritoCSS },
];

export const meta: MetaFunction = () => [
  { title: "GuitarLA - Carrito de compras" },
  {
    name: "description",
    content: "Venta de guitarras, música, blog, carrito de compras",
  },
];

type CarritoContextType = {
  carrito: Item[];
  actualizarCantidad: (item: { cantidad: number; id: number }) => void;
  eliminarGuitarra: (item: number) => void;
};

const carrito = () => {
  const [total, setTotal] = useState(0);
  const { carrito, actualizarCantidad, eliminarGuitarra } =
    useOutletContext<CarritoContextType>();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <ClientOnly fallback={"Cargando..."}>
      {() => (
        <main className="contenedor">
          <div className="heading">Carrito de compras</div>
          <div className="contenido">
            <div className="carrito">
              <h2>Artículos</h2>

              {carrito?.length === 0
                ? "Carrito vacio"
                : carrito?.map((producto) => {
                    return (
                      <div key={producto.id} className="producto">
                        <div>
                          <img
                            src={producto.imagen}
                            alt={`Imagen del producto ${producto.nombre}`}
                          />
                        </div>
                        <div>
                          <p className="nombre">{producto.nombre}</p>
                          <p>Cantidad:</p>
                          <select
                            value={producto.cantidad}
                            onChange={(e) =>
                              actualizarCantidad({
                                cantidad: parseInt(e.target.value),
                                id: producto.id,
                              })
                            }
                            className="select"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                          <p className="precio">
                            $ <span>{producto.precio}</span>
                          </p>
                          <p className="subtotal">
                            Subtotal: ${" "}
                            <span>{producto.cantidad * producto.precio}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          className="btn_eliminar"
                          onClick={() => eliminarGuitarra(producto.id)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
            </div>
            <aside className="resumen">
              <h3>Resumen del Pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default carrito;
