'use client';

import React, { Children, ReactNode, useEffect, useState } from 'react';

interface AutoCarouselProps {
  children: ReactNode;
  desktopClassName: string;
  mobileClassName?: string;
}

export default function AutoCarousel({
  children,
  desktopClassName,
  mobileClassName = 'md:hidden',
}: AutoCarouselProps) {
  const items = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    if (items.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => index + 1);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [items.length]);

  const handleTransitionEnd = () => {
    if (activeIndex !== items.length) return;

    setTransitionEnabled(false);
    setActiveIndex(0);
    window.requestAnimationFrame(() => setTransitionEnabled(true));
  };

  return (
    <>
      <div className={`${mobileClassName} overflow-hidden`}>
        <div
          className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {items.map((item, index) => (
            <div className="w-full shrink-0 px-0.5" key={index}>
              {item}
            </div>
          ))}
          {items.length > 1 && (
            <div className="w-full shrink-0 px-0.5" aria-hidden="true">
              {items[0]}
            </div>
          )}
        </div>
      </div>

      <div className={desktopClassName}>{items}</div>
    </>
  );
}
