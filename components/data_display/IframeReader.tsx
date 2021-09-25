import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import { Iframe } from "../../types/media";

export default function IframeReader({
  src,
  className,
  onLoadError,
  onLoadSuccess,
}: {
  src: Iframe;
  className?: string;
  onLoadError?: () => void;
  onLoadSuccess?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  // Keep focus on iframe on click outside
  useOnClickOutside(ref, () => {
    setTimeout(() => {
      // ref.current?.contentWindow.focus();
    }, 100);
  });

  useEffect(() => {
    setLoaded(ref.current?.contentDocument ?? false);
    window.addEventListener("message", (e) => console.log(e.data));
    if (!loaded && onLoadError) onLoadError();
    else if (onLoadSuccess) onLoadSuccess();
  }, [loaded]);

  return (
    <iframe
      onLoad={(e) => {
        // ref.current.contentWindow.focus();
      }}
      ref={ref}
      src={src}
      className={`${className} ${loaded ? "block" : "hidden"}`}
    />
  );
}
