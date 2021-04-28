const xFramePermission = async (url: string) => {
  const _headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }
  const body = JSON.stringify({
    url: url,
  });
  try {
    const res = await fetch("https://face-on.vercel.app/api/getHeaders", {method:"POST", body: body, headers: _headers})
    return res;
  } catch(error) {
    console.log(error);
  }
}

export default xFramePermission;