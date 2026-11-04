"use client";

import { useState } from "react";
import Image from "next/image";
import ArchFrame from "@/components/ui/ArchFrame";

type ArchImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  children: React.ReactNode;
};

export default function ArchImage({ src, alt, className = "", sizes, priority, children }: ArchImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <ArchFrame className={className}>{children}</ArchFrame>;

  return (
    <div className={`relative overflow-hidden rounded-t-full border border-gold/60 bg-emerald-deep ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}
