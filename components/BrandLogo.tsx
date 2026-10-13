'use client';

import React, { useState } from 'react';

interface BrandLogoProps {
  name: string;
  domain: string;
  iconUrl?: string;
  size?: number;
}

export default function BrandLogo({ name, domain, iconUrl, size = 20 }: BrandLogoProps) {
  const fallbackUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  const [src, setSrc] = useState(iconUrl || fallbackUrl);

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => {
        if (src !== fallbackUrl) {
          setSrc(fallbackUrl);
        }
      }}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}

