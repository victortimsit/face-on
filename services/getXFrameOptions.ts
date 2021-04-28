const getXFrameOptions = async (url: string) => {

  try {
    const res = await fetch("https://face-on.vercel.app/api/getXFrameOptions", {method:"POST", body: JSON.stringify({
      url: url,
    })})
    return res.json();
  } catch(error) {
    console.log(error);
  }
}

export default getXFrameOptions;