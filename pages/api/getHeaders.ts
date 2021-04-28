import { VercelRequest, VercelResponse } from '@vercel/node';


export default async (req: VercelRequest, res: VercelResponse) => {
  const _headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }
  try {
    console.log("RECEIVE URL", JSON.parse(req.body).url);
    // const _res = await fetch(JSON.parse(req.body).url, { method:"HEAD", headers: _headers });
    for(const header in _headers) res.setHeader(header, _headers[header])
    res.status(200).json(req.body)
  } catch(error) {
    console.error("URL ", JSON.parse(req.body).url);
    console.error(error);
  }
}