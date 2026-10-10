'use client';

import React from 'react';
import NidadsLogo from '@/components/NidadsLogo';

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200 transition-all">
      {/* Top micro-banner for urgency - responsive text */}
      <div className="navbar-brand-banner bg-[#009bd7] text-white text-xs sm:text-sm md:text-base font-bold py-2 px-2 text-center tracking-normal">
        Next Batch Starting <strong>Sunday</strong> &bull; Online &amp; Offline Batches Live
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 min-h-[56px] sm:min-h-[64px] flex items-center justify-between gap-3">
          {/* Brand Logo - Self-contained */}
          <a href="#top" className="flex items-center group shrink-0">
            <NidadsLogo size="navbar" />
          </a>

          {/* Center Trust Metric - Desktop only */}
          <div className="hidden lg:flex items-center gap-3 text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full shadow-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <span>★</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-gray-700 font-medium">25,000+ Students Trained</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[#0284c7] font-bold">98% Placement Rate</span>
          </div>

          {/* Right CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="tel:+919205436796"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-[#009bd7] transition-colors px-2 py-1"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                className="text-[#0284c7]"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
              </svg>
              <span>+91 92054 36796</span>
            </a>
            <button
              onClick={onOpenModal}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0284c7] via-[#009bd7] to-[#38b6ff] hover:from-[#0369a1] hover:to-[#0284c7] rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap leading-tight"
            >
              Request Callback
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
