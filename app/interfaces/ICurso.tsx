export type Curso = {
  id: number;
  attributes: CursoAttributes;
};
export type CursoAttributes = {
  contenido: [CursoContenido];
  imagen: CursoImagen;
  titulo: string;
};
export type CursoContenido = {
  children: [CursoContenidoChildren];
  type: string;
};
export type CursoContenidoChildren = {
  text: string;
  type: string;
};
export type CursoImagen = {
  data: CursoImagenData;
};
export type CursoImagenData = {
  id: number;
  attributes: CursoImagenDataAttributes;
};
export type CursoImagenDataAttributes = {
  formats: CursoImagenDataAttributesFormats;
  url: string;
};
export type CursoImagenDataAttributesFormats = {
  medium: CursoImagenDataAttributesFormatsURL;
  small: CursoImagenDataAttributesFormatsURL;
  thumbnail: CursoImagenDataAttributesFormatsURL;
};
export type CursoImagenDataAttributesFormatsURL = {
  url: string;
};
