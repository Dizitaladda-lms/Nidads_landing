'use client';

import React, { useState, useEffect } from 'react';

interface SubNavProps {
  onOpenModal: () => void;
}

export default function SubNav({ onOpenModal }: SubNavProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Why NIDADS', href: '#why' },
    { label: 'Curriculum', href: '#curriculum' },
    { label: 'Projects', href: '#projects' },
    { label: 'Placements', href: '#placements' },
    { label: 'Student Reviews', href: '#stories' },
    { label: 'FAQs', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = navItems.map((item) => document.querySelector(item.href));

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i] as HTMLElement | null;
        if (sec && sec.offsetTop - 120 <= scrollY) {
          setActiveSection(navItems[i].href.substring(1));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-14 sm:top-16 z-40 bg-[#050b14]/95 backdrop-blur border-y border-[#152d4e] shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-11 sm:h-12">
        {/* Horizontal scrollable nav items for mobile */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1 text-xs sm:text-sm font-medium w-full sm:w-auto -mx-1 px-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap transition-all text-[11px] sm:text-xs md:text-sm ${
                  isActive
                    ? 'bg-[#38b6ff]/20 text-[#38b6ff] border border-[#38b6ff]/50 font-bold shadow-[0_0_12px_rgba(56,182,255,0.25)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right Quick Action - hidden on small mobile to give full width to nav */}
        <div className="hidden md:block pl-4 shrink-0">
          <button
            onClick={onOpenModal}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#0284c7] to-[#38b6ff] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-bold text-xs tracking-wide shadow-md shadow-[#38b6ff]/20 transition-all cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
