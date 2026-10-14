'use client';

import React from 'react';
import AutoCarousel from '@/components/AutoCarousel';

interface PlacementProps {
  onOpenModal: () => void;
}

export default function PlacementEcosystem({ onOpenModal }: PlacementProps) {
  const steps = [
    {
      step: '01',
      title: 'ATS-Proof Resume & Profile Overhaul',
      desc: 'Expert review of your GitHub, LinkedIn, and Resume to clear recruiter ATS filters and get 5x more interview shortlists.',
    },
    {
      step: '02',
      title: '1:1 Mock Technical & HR Interviews',
      desc: 'Practice system design, SQL case studies, ML questions, and behavioral scenarios with market leaders.',
    },
    {
      step: '03',
      title: 'Exclusive Job Drives & Referrals',
      desc: 'Get direct referral access across 500+ partner companies and fast-tracked hiring rounds without competing on open boards.',
    },
    {
      step: '04',
      title: 'Salary Negotiation & Offer Selection',
      desc: 'Our placement cell guides you through multiple offers to ensure you secure the highest CTC package for your role.',
    },
  ];

  return (
    <section id="placements" className="py-16 sm:py-20 bg-[#07111e] border-t border-[#152d4e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff] mb-3">
            Career Acceleration Ecosystem
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How NIDADS Gets You Hired: <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              End-to-End Placement Support
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3">
            We provide continuous placement assistance, mock interviews, and recruiter referrals until your offer letter is confirmed.
          </p>
        </div>

        {/* 4 Step Cards */}
        <AutoCarousel desktopClassName="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6" mobileClassName="sm:hidden">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#0a1626] border border-[#152d4e] p-6 flex flex-col justify-between hover:border-[#38b6ff]/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38b6ff]/10"
            >
              <div>
                <div className="mb-4">
                  <span className="text-3xl font-black text-[#38b6ff] font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#152d4e] flex items-center gap-1.5 text-xs text-[#38b6ff] font-medium">
                <span>Verified NIDADS Process</span>
              </div>
            </div>
          ))}
        </AutoCarousel>

        {/* Humanized Placement Cell & ATS Proofing Spotlight Card */}
        <div className="mt-12 rounded-3xl bg-[#0a1b30] border-2 border-[#1e3c66] p-6 sm:p-9 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Placement Head Profile & Human Touch */}
            <div className="lg:col-span-5 space-y-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-[#38b6ff] shadow-xl shrink-0 bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
                    alt="Harsh Vardhan - Head of Placements"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-wider mb-1">
                    Direct Placement Cell
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white">Harsh Vardhan</h4>
                  <p className="text-xs font-bold text-[#38b6ff]">Head of Corporate Hiring Partnerships</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Ex-Tech Recruiter &bull; 14+ Years in Tech Talent Acquisition</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed bg-[#07111e] p-3.5 rounded-2xl border border-[#152d4e]">
                &ldquo;Recruiters spend 6 seconds on a resume. If your bullet points don’t contain quantified business impact and pass the ATS parse filter with a 90%+ score, you won&apos;t get interviewed. Our placement cell works 1-on-1 with every single student to fix this before any application is sent.&rdquo;
              </p>
            </div>

            {/* Right: The 3-Step ATS Proofing Process & Call to Action */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Our 3-Step ATS Resume Guarantee
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#162c4d] space-y-1">
                  <div className="text-emerald-400 font-extrabold text-sm">01. ATS Score 90%+</div>
                  <p className="text-gray-300 text-[11px] leading-tight">
                    Optimized keywords for Python, SQL, ML, &amp; Cloud to breeze past Workday &amp; Taleo algorithms.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#162c4d] space-y-1">
                  <div className="text-[#38b6ff] font-extrabold text-sm">02. Quantified Impact</div>
                  <p className="text-gray-300 text-[11px] leading-tight">
                    Every GitHub project rewritten with business metrics: revenue lift, latency drop &amp; model AUC.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#162c4d] space-y-1">
                  <div className="text-amber-400 font-extrabold text-sm">03. Direct HR Referrals</div>
                  <p className="text-gray-300 text-[11px] leading-tight">
                    Fast-tracked directly to HR inboxes across 500+ enterprises—skipping crowded job boards.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#152d4e]">
                <div className="text-xs text-gray-400 text-center sm:text-left">
                  <strong className="text-white">98% Placement Record</strong> across 25,000+ Enrolled Learners
                </div>
                <button
                  onClick={onOpenModal}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Book Free 1:1 ATS Resume &amp; Career Audit →
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
