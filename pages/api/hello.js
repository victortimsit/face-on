// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const _headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }
  for(const header in _headers) res.setHeader(header, _headers[header])
  res.status(200).json({ name: 'John Doe' })
}
