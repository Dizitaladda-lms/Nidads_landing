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
    <span className="inline-flex shrink-0 flex-col items-start leading-none">
      <img
        src="https://www.nidads.com/Nidads-2.webp"
        alt="NIDADS"
        className={`nidads-logo w-auto object-contain ${sizeClasses[size]}`}
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
      <span className="mt-0.5 whitespace-nowrap text-[6px] sm:text-[7px] font-semibold tracking-[0.035em] text-[#0369a1]">
        NATIONAL INSTITUTE OF DATA ANALYTICS AND DATA SCIENCE
      </span>
    </span>
  );
}
