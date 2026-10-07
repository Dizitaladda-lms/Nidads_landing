'use client';

import React from 'react';

export default function HiringPartners() {
  const companies = [
    'American Express', 'Club Mahindra', 'Fractal', 'Infosys', 
    'Intel', 'L&T Financial', 'AB InBev', 'WNS', 'TVS Credit', 
    'Adobe', 'Amazon', 'Apple', 'Meta', 'SAP', 'Google', 'Deloitte', 'Microsoft'
  ];

  return (
    <section className="py-10 border-b border-[#152d4e] bg-[#07111e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-300 font-bold">
          Trusted by <span className="text-[#38b6ff]">500+</span> Enterprises &amp; Tech Giants
        </p>
      </div>

      {/* Infinite scrolling logo row */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee space-x-8 items-center py-2">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-[#0a1626] border border-[#152d4e] hover:border-[#38b6ff]/50 transition-colors shadow-sm"
            >
              <span className="text-sm sm:text-base font-bold text-gray-200 tracking-wider">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
