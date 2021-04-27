import React, { useEffect, useRef, useState } from "react";

export default function Iframe({
  src,
  className,
  onLoadError,
  onLoadSuccess,
}: {
  src: string;
  className?: string;
  onLoadError?: () => void;
  onLoadSuccess?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setLoaded(ref.current?.contentDocument ?? false);
    if (!loaded && onLoadError) onLoadError();
    else if (onLoadSuccess) onLoadSuccess();
  }, [loaded]);

  return (
    <iframe
      onLoad={(e) => console.log(ref)}
      ref={ref}
      src={src}
      className={`${className} ${loaded ? "block" : "hidden"}`}
    />
  );
}
