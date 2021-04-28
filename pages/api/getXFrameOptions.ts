import { VercelRequest, VercelResponse } from '@vercel/node';

const getXFrameOptions = async(url: string) => {
  try {
    const res = await fetch(url, { method:"HEAD" });
    return res.headers.get('x-frame-options');
  } catch(error) {
    throw Error(error);
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const xFrameOptions = await getXFrameOptions(req.body.url);
    res.status(200).json({ "x_frame_options": xFrameOptions });
  } catch(error) {
    res.status(400).json({error});
  }
}