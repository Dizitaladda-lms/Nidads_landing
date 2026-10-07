'use client';

import React, { Children, ReactNode, TouchEvent, useEffect, useRef, useState } from 'react';

interface AutoCarouselProps {
  children: ReactNode;
  desktopClassName: string;
  mobileClassName?: string;
  intervalMs?: number;
}

export default function AutoCarousel({
  children,
  desktopClassName,
  mobileClassName = 'md:hidden',
  intervalMs = 4500,
}: AutoCarouselProps) {
  const items = Children.toArray(children);
  const [slideIndex, setSlideIndex] = useState(items.length > 1 ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [interactionVersion, setInteractionVersion] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (items.length < 2) return;

    const intervalId = window.setInterval(() => {
      setSlideIndex((index) => index + 1);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [interactionVersion, intervalMs, items.length]);

  const recordInteraction = () => setInteractionVersion((version) => version + 1);

  const goToPrevious = () => {
    setSlideIndex((index) => index - 1);
    recordInteraction();
  };

  const goToNext = () => {
    setSlideIndex((index) => index + 1);
    recordInteraction();
  };

  const goToSlide = (index: number) => {
    setSlideIndex(index + 1);
    recordInteraction();
  };

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    const isAfterLastSlide = slideIndex === items.length + 1;
    const isBeforeFirstSlide = slideIndex === 0;
    if (!isAfterLastSlide && !isBeforeFirstSlide) return;

    setTransitionEnabled(false);
    setSlideIndex(isAfterLastSlide ? 1 : items.length);
    window.requestAnimationFrame(() => setTransitionEnabled(true));
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (startX === null || endX === undefined || Math.abs(endX - startX) < 40) return;
    if (endX < startX) goToNext();
    else goToPrevious();
  };

  const activeIndex = items.length > 0 ? (slideIndex - 1 + items.length) % items.length : 0;

  return (
    <>
      <div className={`${mobileClassName} overflow-hidden`}>
        <div
          className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {items.length > 1 && (
            <div className="w-full shrink-0 px-0.5" aria-hidden="true">
              {items[items.length - 1]}
            </div>
          )}
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

      {items.length > 1 && (
        <div className={`${mobileClassName} flex items-center justify-center gap-3 pt-3`}>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#38b6ff]/30 bg-[#07111e] text-[#38b6ff] transition-colors hover:bg-[#38b6ff]/10"
          >
            ‹
          </button>
          <div className="flex items-center gap-1.5" aria-label="Choose slide">
            {items.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-5 bg-[#38b6ff]' : 'w-2 bg-[#38b6ff]/30 hover:bg-[#38b6ff]/60'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next slide"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#38b6ff]/30 bg-[#07111e] text-[#38b6ff] transition-colors hover:bg-[#38b6ff]/10"
          >
            ›
          </button>
        </div>
      )}

      <div className={desktopClassName}>{items}</div>
    </>
  );
}
