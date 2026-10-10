'use client';

import React from 'react';

export default function WhatsAppButton() {
  const phoneNumber = '919205436796'; // Official NIDADS Admissions WhatsApp
  const defaultMessage = encodeURIComponent(
    'Hi NIDADS, I saw your Data Science & AI Bootcamp Ad and want to know more about the course fees, curriculum, and placement assistance.'
  );

  return (
    <div className="fixed bottom-[4.5rem] md:bottom-6 right-3.5 sm:right-5 z-40 flex flex-col items-center gap-2.5 sm:gap-3">
      {/* Phone Call Button (Upar Phone Logo) */}
      <a
        href="tel:+919205436796"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#0284c7] via-[#009bd7] to-[#38b6ff] hover:from-[#0369a1] hover:to-[#0284c7] text-white shadow-xl shadow-sky-600/35 transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-sky-200/50 cursor-pointer"
        aria-label="Call NIDADS at +91 92054 36796"
        title="Call NIDADS (+91 92054 36796)"
      >
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
      </a>

      {/* WhatsApp Circular Button (Sirf WhatsApp Logo) */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-600/35 transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-emerald-300/40 cursor-pointer"
        aria-label="Chat with NIDADS on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2a9.87 9.87 0 0 0-8.46 14.96L2.2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.08a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.81.83-3.01-.2-.31a8.15 8.15 0 1 1 6.91 3.82Zm4.48-6.1c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.8.98-.15.16-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.38.11-.5.11-.1.25-.27.37-.41.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.12.16 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.11-.23-.17-.48-.29Z" />
        </svg>
      </a>
    </div>
  );
}
