module.exports = (req, res) => {
  try {
    const _res = fetch(req.body.url, { method:"HEAD" });
    res.json({headers: _res.headers})
  } catch(error) {
    throw Error(error);
  }
}