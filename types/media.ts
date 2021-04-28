export type Media<Type> = {
  type: "PDF" | "Iframe",
  data: Type,
}
export type PDF = string | ArrayBuffer

export type Iframe = string

