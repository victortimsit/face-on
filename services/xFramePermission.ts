const xFramePermission = async (url: string) => {
  const body = JSON.stringify({
    url: url,
  });
  try {
    const res = await fetch("https://face-on.vercel.app/api/getHeaders", {method:"POST", body: body})
    return res;
  } catch(error) {
    console.log(error);
  }
}

export default xFramePermission;