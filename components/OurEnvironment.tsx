'use client';

import React from 'react';

const environmentPhotos = [
  {
    src: '/environment/IMG_1053.webp',
    alt: 'NIDADS learning environment',
  },
  {
    src: '/environment/IMG_1054.webp',
    alt: 'NIDADS classroom',
  },
  {
    src: '/environment/IMG_1055.webp',
    alt: 'NIDADS students learning together',
  },
  {
    src: '/environment/IMG_1056.webp',
    alt: 'NIDADS training space',
  },
  {
    src: '/environment/IMG_1057.webp',
    alt: 'NIDADS learning space',
  },
  {
    src: '/environment/IMG_1058.webp',
    alt: 'NIDADS classroom learning',
  },
  {
    src: '/environment/IMG_1059.webp',
    alt: 'NIDADS student community',
  },
  {
    src: '/environment/IMG_1060.webp',
    alt: 'NIDADS education environment',
  },
];

function PhotoGroup({ photos, duplicate = false }: { photos: typeof environmentPhotos; duplicate?: boolean }) {
  return (
    <div className="environment-photo-group" aria-hidden={duplicate || undefined}>
      {photos.map((photo, index) => (
        <img
          key={`${photo.src}-${index}`}
          src={photo.src}
          alt={duplicate ? '' : photo.alt}
          className="h-28 w-44 shrink-0 rounded-xl border border-[#dbeafe] object-cover shadow-sm sm:h-36 sm:w-64"
          loading="lazy"
        />
      ))}
    </div>
  );
}

function PhotoMarquee({ photos, reverse = false }: { photos: typeof environmentPhotos; reverse?: boolean }) {
  return (
    <div className="environment-marquee">
      <div className={`environment-marquee-track${reverse ? ' environment-marquee-reverse' : ''}`}>
        <PhotoGroup photos={photos} />
        <PhotoGroup photos={photos} duplicate />
      </div>
    </div>
  );
}

export default function OurEnvironment() {
  const firstMobileRow = environmentPhotos.filter((_, index) => index % 2 === 0);
  const secondMobileRow = environmentPhotos.filter((_, index) => index % 2 === 1);

  return (
    <section
      aria-labelledby="environment-heading"
      className="overflow-hidden border-b border-[#dbeafe] bg-[#f8fbff] py-10 sm:py-14"
    >
      <div className="mx-auto mb-6 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0369a1]">
          Our Environment
        </p>
        <h2 id="environment-heading" className="text-2xl font-extrabold tracking-tight text-[#102a43] sm:text-3xl">
          Learn, Build &amp; Grow Together
        </h2>
      </div>

      <div className="hidden md:block">
        <PhotoMarquee photos={environmentPhotos} />
      </div>

      <div className="space-y-3 md:hidden">
        <PhotoMarquee photos={firstMobileRow} />
        <PhotoMarquee photos={secondMobileRow} reverse />
      </div>
    </section>
  );
}
