'use client';

import React from 'react';

interface MobileStickyBarProps {
  onOpenModal: () => void;
}

export default function MobileStickyBar({ onOpenModal }: MobileStickyBarProps) {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#050b14]/98 backdrop-blur-md border-t border-[#152d4e] px-3 py-2 shadow-2xl"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-2">
        {/* Direct Call Button */}
        <a
          href="tel:+919205436796"
          className="px-3.5 py-2.5 rounded-xl bg-[#07111e] text-[#38b6ff] font-bold text-xs border border-[#152d4e] flex items-center justify-center shrink-0 hover:border-[#38b6ff]/50 active:scale-95 transition-all"
          aria-label="Call NIDADS admissions"
        >
          Call Us
        </a>

        {/* Primary CTA */}
        <button
          onClick={onOpenModal}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#38b6ff]/30 flex items-center justify-center active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          Book Free Counselling
        </button>
      </div>
    </div>
  );
}
