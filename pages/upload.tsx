import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import MediaTimeline from "../components/data_display/MediaTimeline";
import Typography from "../components/data_display/Typography";
import SnackNotif from "../components/feedbacks/SnackNotif";
import SearchBar from "../components/inputs/SearchBar";
import UploadFile from "../components/inputs/UploadFile";
import { useAppContext } from "../context/state";
import { errors } from "../data/errors";
import useIframe from "../hooks/useIframe";
import { bytesToSize } from "../utils/file";
import { isValidURL } from "../utils/isValidURL";

export default function Upload() {
  const [notif, setNotif] = useState<false | string>(false);
  const [value, setValue] = useState<string>(null);
  const [status, setStatus] = useState<string>(null);
  const [loadedIframe, loadIframe] = useIframe();
  const appCtx = useAppContext();
  const router = useRouter();

  const handleSearch = async (e) => {
    setValue(e.target.value);
    if (e.target.value == "") return false;

    const url = isValidURL(e.target.value);
    url ? await loadIframe(e.target.value) : setNotif(errors.invalid_url);
  };

  useEffect(() => {
    appCtx.setFullFace(false);
    if (!loadedIframe && value) setNotif(errors.unauthorized_iframe);
    if (loadedIframe) {
      setValue("");
      const name = new URL(loadedIframe).host;
      appCtx.setMedia([
        ...appCtx.media,
        { data: loadedIframe, type: "Iframe", name },
      ]);
    }
  }, [loadedIframe]);

  const handleLoad = (file, fileName) => {
    setStatus(`${fileName} loaded`);
    appCtx.setMedia([
      ...appCtx.media,
      { data: file, type: "PDF", name: fileName },
    ]);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    setStatus(`Loading ${file.name} - ${bytesToSize(file.size)}...`);

    fileReader.onload = (e) => handleLoad(e.target.result, file.name);
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
        className="w-96 max-w-xs"
      >
        <SearchBar
          value={value}
          onChange={handleSearch}
          onFileChange={handleFile}
        />
      </SnackNotif>
      <Typography variant="caption" className="my-4 text-neutral-500">
        {status}ㅤ
      </Typography>
      <MediaTimeline>
        <Button
          onClick={() => router.push("/player")}
          children="Start 🧑"
          // icon={<PlayIcon />}
        />
      </MediaTimeline>
    </div>
  );
}
