import React, { useState } from "react";
import { bytesToSize } from "../../utils/file";
import Typography from "../data_display/Typography";

export default function UploadFile({
  className,
  onFileLoad,
}: {
  className?: string;
  onFileLoad: (file: string | ArrayBuffer, fileName: String) => any;
}) {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("Put my face on...");
  const [subtitle, setSubtitle] = useState(
    "Add PDF or paste URL (Youtube, Figma, Website...)"
  );

  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    setTitle(file.name);
    setSubtitle(`Loading ${bytesToSize(file.size)}...`);

    fileReader.onload = (e) => handleLoad(e, file.name);
  };

  const handleLoad = (e: ProgressEvent<FileReader>, fileName: String) => {
    setSubtitle(`${fileName} loaded`);
    onFileLoad(e.target.result, fileName);
  };

  const handleDragEnter = () => {
    setActive(true);
  };
  const handleDragEnd = () => {
    setActive(false);
  };

  return (
    <label
      className={`flex relative flex-col justify-center items-center ${
        active && "bg-red-200"
      } ${className}`}
      onDragStart={handleDragEnter}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragEnd}
      onDragEnd={handleDragEnd}
      onDragExit={handleDragEnd}
    >
      <Typography variant="h3" className="pb-6 pointer-events-none">
        {title}
      </Typography>
      <Typography variant="body1" className="pb-12 pointer-events-none">
        {subtitle}
      </Typography>
      <input
        className="w-full h-full opacity-0 absolute left-0 top-0 right-0 bottom-0"
        id="input"
        type="file"
        onChange={(e) => handleFile(e)}
      />
    </label>
  );
}
