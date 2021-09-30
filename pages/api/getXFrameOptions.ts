import { VercelRequest, VercelResponse } from "@vercel/node";

const _headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

const getXFrameOptions = async (url: string) => {
  try {
    const res = await fetch(url, { method: "GET" });
    return res.headers.get("x-frame-options");
  } catch (error) {
    throw Error(error);
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const xFrameOptions = await getXFrameOptions(JSON.parse(req.body).url);
    for (const property in _headers)
      res.setHeader(property, _headers[property]);
    res.status(200).json({ x_frame_options: xFrameOptions });
  } catch (error) {
    res.status(400).json({ error });
  }
};
