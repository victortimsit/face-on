import { PlayIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import SnackNotif from "../components/feedbacks/SnackNotif";
import SearchBar from "../components/inputs/SearchBar";
import UploadFile from "../components/inputs/UploadFile";
import { useAppContext } from "../context/state";
import { errors } from "../data/errors";
import useIframe from "../hooks/useIframe";
import { isValidURL } from "../utils/isValidURL";

export default function Upload() {
  const [notif, setNotif] = useState<false | string>(false);
  const [loadedIframe, loadIframe] = useIframe();
  const appCtx = useAppContext();
  const router = useRouter();

  const handleSearch = (e) => {
    const url = isValidURL(e.target.value);
    url ? loadIframe(e.target.value) : setNotif(errors.invalid_url);
  };

  useEffect(() => {
    if (loadedIframe == false) setNotif(errors.unauthorized_iframe);
    else
      appCtx.setMedia([
        ...appCtx.media,
        { data: loadedIframe, type: "Iframe" },
      ]);
  }, [loadedIframe]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <UploadFile
        className="w-full"
        onFileLoad={(file) =>
          appCtx.setMedia([...appCtx.media, { data: file, type: "PDF" }])
        }
      />
      <SnackNotif
        message={notif && notif}
        run={notif != false}
        onEnded={() => setNotif(false)}
      >
        <SearchBar onChange={handleSearch} />
      </SnackNotif>
      <Button
        onClick={() => router.push("/player")}
        children="Start"
        className="mt-4"
        icon={<PlayIcon />}
      />
    </div>
  );
}
