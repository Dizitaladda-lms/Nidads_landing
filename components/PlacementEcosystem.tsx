'use client';

import React from 'react';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>

        {/* Placement Track Record Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0a1626] via-[#07111e] to-[#0369a1]/30 border border-[#38b6ff]/40 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              98% Placement Rate Across 15,000+ Enrolled Learners
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              From fresh graduates securing their first 6-12 LPA tech job to experienced professionals achieving senior 18-28 LPA positions.
            </p>
          </div>
          <button
            onClick={onOpenModal}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#38b6ff]/25 whitespace-nowrap transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Speak to Placement Cell
          </button>
        </div>

      </div>
    </section>
  );
}
