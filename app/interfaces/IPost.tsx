export type Posts = {
  id: number;
  attributes: Post;
};
export type Post = {
  contenido: [PostContenido];
  imagen: PostImagen;
  titulo: string;
  publishedAt: string;
  url: string;
};
export type PostContenido = {
  children: [PostContenidoChildren];
  type: string;
};
export type PostContenidoChildren = {
  text: string;
  type: string;
};
export type PostImagen = {
  data: PostImagenData;
};
export type PostImagenData = {
  id: number;
  attributes: PostImagenDataAttributes;
};
export type PostImagenDataAttributes = {
  formats: PostImagenDataAttributesFormats;
  url: string;
};
export type PostImagenDataAttributesFormats = {
  medium: PostImagenDataAttributesFormatsURL;
  small: PostImagenDataAttributesFormatsURL;
  thumbnail: PostImagenDataAttributesFormatsURL;
};
export type PostImagenDataAttributesFormatsURL = {
  url: string;
};
