import Image from "next/image";
import { useEffect, useState } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function BlurImage({ src, alt, width, height, className }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;

    if (img.complete && img.naturalWidth !== 0) {
      // Image is cached, skip blur
      setIsCached(true);
      setLoaded(true);
    } else {
      setIsCached(false);
      setLoaded(false);
      // In case it wasn’t cached, attach onload to set loaded
      img.onload = () => {
        setLoaded(true);
      };
    }
  }, [src]);

  return (
    <div className={`relative inline-block overflow-hidden align-middle ${className}`} style={{ width, height }}>
      {/* Show blurred only if NOT cached */}
      {!isCached && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ease-out filter blur-md scale-105
            ${loaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
          priority={false}
          draggable={false}
        />
      )}

      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`relative w-full h-full object-contain transition-filter duration-700 ease-out
          ${loaded ? 'blur-0 opacity-100' : 'blur-md opacity-0'}`}
        priority={false}
        draggable={false}
      />
    </div>
  );
}
