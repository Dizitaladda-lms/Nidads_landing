'use client';

import React from 'react';

export default function WhatsAppButton() {
  const phoneNumber = '919205436796'; // Official NIDADS Admissions WhatsApp
  const defaultMessage = encodeURIComponent(
    'Hi NIDADS, I saw your Data Science & AI Bootcamp Ad and want to know more about the course fees, curriculum, and placement assistance.'
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[4.5rem] md:bottom-6 right-3 sm:right-5 z-40 flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 border border-emerald-400/30"
      aria-label="Chat with NIDADS on WhatsApp"
    >
      <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse"></span>
      <span className="font-bold text-xs sm:text-sm tracking-wide">WhatsApp Us</span>
    </a>
  );
}
