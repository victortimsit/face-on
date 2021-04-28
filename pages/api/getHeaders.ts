import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';


export default async (req: VercelRequest, res: VercelResponse) => {
  const _headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }
  try {
    console.log("RECEIVE URL", req.body.url);
    const _res = await fetch(req.body.url, { method:"HEAD", headers: _headers });
    for(const header in _headers) res.setHeader(header, _headers[header])

    res.json({headers: _res.headers})
  } catch(error) {
    console.error("URL ", req.body.url);
    console.error(error);
  }
}