export type Media<Type> = {
  type: "PDF" | "Iframe";
  data: Type;
  name: String;
};
export type PDF = string | ArrayBuffer;

export type Iframe = string;

export type MediaType = PDF | Iframe;
