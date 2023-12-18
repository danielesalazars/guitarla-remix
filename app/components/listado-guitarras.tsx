import { ComponentProps, FC } from "react";
import { Guitarras as IGuitarras } from "../interfaces/IGuitarra";
import Guitarra from "../components/guitarra";

type CPListadoGuitarras = ComponentProps<"div">;
type ListadoGuitarrasProps = CPListadoGuitarras & {
  guitarras: IGuitarras[];
};

const ListadoGuitarras: FC<ListadoGuitarrasProps> = ({ guitarras }) => {
  return (
    <>
      <h2 className="heading">Nuestra Colección</h2>
      {guitarras?.length && (
        <div className="guitarras-grid">
          {guitarras.map((guitarra) => (
            <Guitarra key={guitarra.id} guitarra={guitarra.attributes} />
          ))}
        </div>
      )}
    </>
  );
};

export default ListadoGuitarras;
