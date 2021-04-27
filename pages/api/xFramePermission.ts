const xFramePermission = async (url: string) => {
  try {
    const res = await fetch(url, {method: "HEAD"});
    return res;
  } catch (error) {
    console.log(error);
  } 
}
export default xFramePermission;
