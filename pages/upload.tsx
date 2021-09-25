import { PlayIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../components/buttons/Button";
import MediaTimeline from "../components/data_display/MediaTimeline";
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

  const handleSearch = async (e) => {
    if (e.target.value == "") return false;

    const url = isValidURL(e.target.value);
    url ? await loadIframe(e.target.value) : setNotif(errors.invalid_url);

    if (loadedIframe == null) setNotif(errors.unauthorized_iframe);
    else
      appCtx.setMedia([
        ...appCtx.media,
        { data: loadedIframe, type: "Iframe", name: "Iframe" },
      ]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <UploadFile
        className="w-full"
        onFileLoad={(file, fileName) =>
          appCtx.setMedia([
            ...appCtx.media,
            { data: file, type: "PDF", name: fileName },
          ])
        }
      />
      <SnackNotif
        message={notif && notif}
        run={notif != false}
        onEnded={() => setNotif(false)}
      >
        <SearchBar onChange={handleSearch} />
      </SnackNotif>
      <MediaTimeline className="mt-8">
        <Button
          onClick={() => router.push("/player")}
          children="Start"
          icon={<PlayIcon />}
        />
      </MediaTimeline>
    </div>
  );
}
