import { createContext, useContext, useState } from "react";
import { Media, MediaType } from "../types/media";

type State = {
  media: Media<MediaType>[];
  setMedia: Function;
  fullFace: boolean;
  setFullFace: Function;
};

const AppContext = createContext<State>(null);

export function AppWrapper({ children }) {
  const [media, setMedia] = useState<Media<MediaType>[]>([]);
  const [fullFace, setFullFace] = useState<boolean>(false);

  const state: State = {
    media,
    setMedia,
    fullFace,
    setFullFace,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
