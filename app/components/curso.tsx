import { ComponentProps, FC } from "react";
import { CursoAttributes as ICurso } from "../interfaces/ICurso";

type CPCurso = ComponentProps<"div">;
type CursoProps = CPCurso & {
  curso: ICurso;
};

const Curso: FC<CursoProps> = ({ curso }) => {
  const { contenido, imagen, titulo } = curso;

  const contenidoText: string[] = [];

  contenido.map(({ children }) =>
    children?.map(({ text }) => {
      contenidoText.push(text);
    })
  );

  return (
    <section
      className="curso"
      style={{
        backgroundImage: `linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url})`,
      }}
    >
      {/* <style>{`
        .curso {
          background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url});
        }
      `}</style> */}
      <div className="contenedor curso-grid">
        <div className="contenido">
          <h2 className="heading">{titulo}</h2>
          {contenidoText.map((content, i) => {
            return (
              <p className="texto" key={i}>
                {content}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Curso;
