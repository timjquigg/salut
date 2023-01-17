import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({ src, alt }) {
  const [imageError, setImageError] = useState(false);
  const fallbackSrc = `https://www.ohlq.com/ui/dist/assets/toolkit/images/product/no-product-image.png`;
  return (
    <Image
      src={imageError ? fallbackSrc : src}
      alt={alt}
      width={435}
      height={450}
      quality={35}
      position="relative"
      layout="intrinsic"
      object-fit="cover"
      onError={() => setImageError(true)}
    />
  );
}
