const getXFrameOptions = async (url: string) => {

  try {
    const res = await fetch("https://face-on.vercel.app/api/getXFrameOptions", {method:"POST", body: JSON.stringify({
      url: url,
    })})
    if(res.ok)
    return res.json() 
    else throw Error();
  } catch(error) {
    throw Error(error);
  }
}

export default getXFrameOptions;