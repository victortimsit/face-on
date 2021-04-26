const xFramePermission = async(url: string) => {
  try {
    const res = await fetch(url, {method: "OPTION"});
    return res;
  } catch (error) {
    
  }
}
export default xFramePermission ;
