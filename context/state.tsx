import { createContext, useContext, useState } from "react";
import useIframe from "../hooks/useIframe";

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [files, setFiles] = useState([]);
  const [loadedIframe, loadIframe] = useIframe();

  const state = {
    files,
    setFiles,
    loadedIframe,
    loadIframe,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
