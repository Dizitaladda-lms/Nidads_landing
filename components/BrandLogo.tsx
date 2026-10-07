import React from 'react';

interface BrandLogoProps {
  name: string;
  domain: string;
  size?: number;
}

export default function BrandLogo({ name, domain, size = 20 }: BrandLogoProps) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 object-contain"
    />
  );
}
