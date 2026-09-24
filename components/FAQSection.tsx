'use client';

import React, { useState } from 'react';

interface FAQProps {
  onOpenModal: () => void;
}

export default function FAQSection({ onOpenModal }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is included in the NIDADS Data Science and AI course?',
      a: 'The course includes live instructor-led sessions, real-world project work, Python and SQL training, machine learning modules, Power BI analytics, modern AI workflows, and full placement support. It is designed as a complete, job-ready training program for both beginners and experienced professionals.',
    },
    {
      q: 'Is prior programming or coding experience required to join?',
      a: 'No prior programming experience is required! The course starts from foundational Python, SQL, and data analysis concepts, then systematically advances into machine learning and AI model development. Over 45% of our learners join from non-tech or non-coding backgrounds.',
    },
    {
      q: 'Can working professionals join the online data analytics course?',
      a: 'Yes. NIDADS offers online live batches, weekend classes, and evening schedules so working professionals can comfortably learn data analytics and machine learning without disrupting their existing job. All live classes have recorded video backups.',
    },
    {
      q: 'Does the program include placement support and interview preparation?',
      a: 'Yes. NIDADS provides dedicated placement assistance, 1:1 mock interviews, ATS resume reviews, and company-specific job referrals across 500+ hiring enterprise partners to help you transition into high-paying analytics roles.',
    },
    {
      q: 'Are offline classroom batches available?',
      a: 'Yes! NIDADS provides both interactive online live training pan-India and in-person classroom batches at our New Delhi center located in Greater Kailash II.',
    },
    {
      q: 'What certifications will I get after completing the course?',
      a: 'You receive an industry-recognized NIDADS certificate of excellence, project verification credentials for real-world capstones, and preparation for external global certifications.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#07111e] border-t border-[#152d4e] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff] mb-3">
            Got Questions?
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Everything you need to know about the NIDADS bootcamp, eligibility, batches, and placement support.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0a1626] border-[#38b6ff]/50 shadow-lg shadow-[#38b6ff]/10'
                    : 'bg-[#050b14] border-[#152d4e] hover:border-[#38b6ff]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {item.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[#38b6ff] font-bold text-base shrink-0">
                    {isOpen ? '−' : '+'}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-[#152d4e]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 rounded-2xl bg-[#050b14] border border-[#152d4e] text-center space-y-3">
          <p className="text-sm text-gray-300 font-medium">
            Have more questions regarding fees, EMI plans, or batch timings?
          </p>
          <button
            onClick={onOpenModal}
            className="inline-block px-5 py-2.5 rounded-xl bg-[#07111e] hover:bg-[#0a1626] text-white text-xs sm:text-sm font-semibold border border-[#38b6ff]/30 hover:border-[#38b6ff]/60 transition-colors cursor-pointer"
          >
            Speak with a NIDADS Admissions Advisor
          </button>
        </div>

      </div>
    </section>
  );
}
