'use client';

import React from 'react';
import BrandLogo from '@/components/BrandLogo';

export default function HiringPartners() {
  const companies = [
    { name: 'American Express', domain: 'americanexpress.com' },
    { name: 'Club Mahindra', domain: 'clubmahindra.com' },
    { name: 'Fractal', domain: 'fractal.ai' },
    { name: 'Infosys', domain: 'infosys.com' },
    { name: 'Intel', domain: 'intel.com' },
    { name: 'L&T Financial', domain: 'ltfs.com' },
    { name: 'AB InBev', domain: 'ab-inbev.com' },
    { name: 'WNS', domain: 'wns.com' },
    { name: 'TVS Credit', domain: 'tvscredit.com' },
    { name: 'Adobe', domain: 'adobe.com' },
    { name: 'Amazon', domain: 'amazon.com' },
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Meta', domain: 'meta.com' },
    { name: 'SAP', domain: 'sap.com' },
    { name: 'Google', domain: 'google.com' },
    { name: 'Deloitte', domain: 'deloitte.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
  ];

  return (
    <section className="py-10 border-b border-[#152d4e] bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-600 font-bold">
          Trusted by <span className="text-[#38b6ff]">500+</span> Enterprises &amp; Tech Giants
        </p>
      </div>

      {/* Infinite scrolling logo row */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee space-x-8 items-center py-2">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#152d4e] hover:border-[#38b6ff]/50 transition-colors shadow-sm"
            >
              <BrandLogo name={company.name} domain={company.domain} />
              <span className="text-sm sm:text-base font-bold text-gray-700 tracking-wide">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
