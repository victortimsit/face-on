export default async (req, res) => {
  try {
    const _res = await fetch(req.body.url, { method:"HEAD" });
    res.json({headers: _res.headers})
  } catch(error) {
    throw Error(error);
  }
}