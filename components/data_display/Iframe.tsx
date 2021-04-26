import React, { useEffect, useRef, useState } from "react";
import Typography from "./Typography";

export default function Iframe({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setLoaded(ref.current?.contentDocument ?? false);
  }, [loaded]);

  return (
    <>
      <iframe
        ref={ref}
        src={src}
        className={`${className} ${loaded ? "block" : "hidden"}`}
      />
      {!loaded && <Typography>Failed to load iframe</Typography>}
    </>
  );
}
