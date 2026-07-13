import { useState, useEffect, useRef } from "react";

interface SmartImgProps {
  path: string | Blob | null;
  baseUrl?: string;
  fallback: string;
  alt?: string;
  className?: string;
}

export const SmartImg = ({ path, baseUrl = "", fallback, alt, className }: SmartImgProps) => {
  const [loaded, setLoaded] = useState(false);
  const [errorFallback, setErrorFallback] = useState<string | null>(null);
  const [blobSrc, setBlobSrc] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  let derivedSrc = fallback;
  if (typeof path === "string") {
    derivedSrc = path.startsWith("/") ? `${baseUrl}${path}` : path;
  } else if (path instanceof Blob && blobSrc) {
    derivedSrc = blobSrc;
  }

  const finalSrc = errorFallback ?? derivedSrc;

  useEffect(() => {
    setLoaded(false);
    setErrorFallback(null);

    let currentBlobUrl: string | null = null;

    if (path instanceof Blob) {
      currentBlobUrl = URL.createObjectURL(path);
      setBlobSrc(currentBlobUrl);
    } else {
      setBlobSrc(null);
    }

    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }

    return () => {
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [path]);

  return (
    <img
      ref={imgRef}
      src={finalSrc}
      alt={alt}
      className={`${className ?? ""} transition-opacity duration-300 ${!loaded ? "opacity-0" : "opacity-100"}`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(true);
        if (finalSrc !== fallback) {
          setErrorFallback(fallback);
        }
      }}
    />
  );
};
