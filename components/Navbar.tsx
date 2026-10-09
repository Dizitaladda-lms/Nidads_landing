'use client';

import React from 'react';
import NidadsLogo from '@/components/NidadsLogo';

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent border-b border-[#152d4e] transition-all">
      {/* Top micro-banner for urgency - responsive text */}
      <div className="bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#38b6ff] text-white text-[13px] sm:text-sm font-semibold py-2 px-2 text-center tracking-normal">
        Next Batch Starting <strong>Sunday</strong> &bull; Online &amp; Offline Batches Live
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo - Self-contained */}
        <a href="#top" className="flex items-center group shrink-0">
          <NidadsLogo size="navbar" />
        </a>

        {/* Center Trust Metric - Desktop only */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-gray-300 bg-[#07111e] border border-[#152d4e] px-3.5 py-1.5 rounded-full">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <span>★</span>
            <span>4.9/5 (12,870+ ratings)</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className="text-gray-300">25,000+ Students Trained</span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className="text-[#38b6ff] font-semibold">98% Placement Rate</span>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="tel:+919205436796"
            className="hidden sm:inline-block text-xs font-semibold text-gray-300 hover:text-white transition-colors px-2 py-1"
          >
            +91 92054 36796
          </a>
          <button
            onClick={onOpenModal}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] rounded-lg shadow-md shadow-[#38b6ff]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            Request Callback
          </button>
        </div>
      </div>
    </header>
  );
}
