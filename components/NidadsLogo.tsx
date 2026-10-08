import React from 'react';

interface NidadsLogoProps {
  size?: 'navbar' | 'footer' | 'certificate';
}

const sizeClasses = {
  navbar: 'h-7 sm:h-8',
  footer: 'h-8',
  certificate: 'h-6 sm:h-7',
};

export default function NidadsLogo({ size = 'footer' }: NidadsLogoProps) {
  return (
    <span className="inline-flex shrink-0 items-center leading-none">
      <img
        src="https://www.nidads.com/Nidads-2.webp"
        alt="NIDADS"
        className={`nidads-logo w-auto object-contain ${sizeClasses[size]}`}
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
    </span>
  );
}
