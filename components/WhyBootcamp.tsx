'use client';

import React from 'react';
import AutoCarousel from '@/components/AutoCarousel';

export default function WhyBootcamp() {
  const highlights = [
    {
      num: '01',
      title: '1M+ Open Tech & AI Jobs',
      desc: 'Massive global and domestic demand for Data Scientists, Data Analysts, and AI specialists with applied project skills.',
      badge: 'High Growth',
      color: 'border-[#38b6ff]/30 text-[#38b6ff]',
    },
    {
      num: '02',
      title: 'AI-First Hands-on Curriculum',
      desc: 'Master Python, SQL, Power BI, Machine Learning & modern Generative AI workflows to build models 10x faster with industry precision.',
      badge: 'Industry Standard',
      color: 'border-[#46d9ff]/30 text-[#46d9ff]',
    },
    {
      num: '03',
      title: '24/7 1-on-1 Doubt Support',
      desc: 'Never get stuck while coding or analyzing datasets. Our dedicated mentors resolve code errors via live chat & screen share.',
      badge: 'Instant Help',
      color: 'border-emerald-500/30 text-emerald-400',
    },
    {
      num: '04',
      title: 'Learn from Aman (Ex-Amazon) & Priya (Deloitte)',
      desc: 'Personalized 1:1 mock technical rounds, code reviews, and portfolio teardowns by active Data Leads from Amazon, Deloitte & Microsoft.',
      badge: 'MAANG Mentors',
      color: 'border-amber-500/30 text-amber-400',
    },
  ];

  const comparisonRows = [
    {
      feature: 'Total Financial Investment',
      selfStudy: '₹0 (Free Videos)',
      college: '₹10 Lakhs - ₹16 Lakhs',
      nidads: 'Affordable Easy EMIs (Best ROI)',
      nidadsHighlight: true,
    },
    {
      feature: 'Time to Job-Ready',
      selfStudy: '2+ Years in Tutorial Hell',
      college: '3 to 4 Years (Outdated)',
      nidads: '36 Weeks (9 Months Accelerated)',
      nidadsHighlight: true,
    },
    {
      feature: 'Portfolio & Capstones',
      selfStudy: 'Toy Titanic/Iris Datasets',
      college: 'Theoretical exams, 0 live code',
      nidads: '20+ Production GitHub Repos',
      nidadsHighlight: true,
    },
    {
      feature: '1-on-1 Doubt Resolution',
      selfStudy: 'Unanswered StackOverflow',
      college: 'Unavailable Professors',
      nidads: '24/7 Live Screen-Share Help',
      nidadsHighlight: true,
    },
    {
      feature: 'Mentorship Source',
      selfStudy: 'Zero Guidance',
      college: 'Tenured Academic Staff',
      nidads: 'Direct 1:1 MAANG Data Leads',
      nidadsHighlight: true,
    },
    {
      feature: 'Job Placement Odds (ROI)',
      selfStudy: 'Under 5% (Cold Resumes)',
      college: '35% - 40% (Mass 3-4 LPA IT)',
      nidads: '98% Placement Rate (₹12+ LPA target)',
      nidadsHighlight: true,
    },
    {
      feature: 'Dedicated Placement Cell',
      selfStudy: 'None',
      college: 'Mass pooled drives',
      nidads: '500+ Exclusive Partner Drives',
      nidadsHighlight: true,
    },
  ];

  return (
    <section id="why" className="py-16 sm:py-24 bg-[#050b14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-bold text-[#38b6ff] uppercase tracking-wider mb-3">
            Why 25,000+ Learners Choose NIDADS
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Built for Real Career Growth, <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              Not Outdated Academic Theory
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-2xl mx-auto">
            From foundational statistics to advanced Generative AI agents, NIDADS offers industry-backed programs designed to transition beginners and working professionals into high-paying data roles.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <AutoCarousel desktopClassName="hidden md:grid md:grid-cols-2 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl bg-[#07111e] border ${item.color} backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38b6ff]/10`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-gray-400 font-mono">
                  {item.num}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-gray-200 border border-white/10">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </AutoCarousel>

        {/* Comparison Table on Steroids: The Financial ROI Comparison */}
        <div className="mt-14 p-5 sm:p-8 rounded-3xl bg-[#07111e] border border-[#1e3c66] shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              Financial ROI &amp; Time Comparison
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              The NIDADS Edge vs. Self-Study vs. College
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
              Why a structured, mentor-driven bootcamp is the only logical financial investment in 2026:
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#152d4e]">
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">
                    Key Evaluation Factor
                  </th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">
                    Self-Study (YouTube / Blogs)
                  </th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">
                    College / University Degrees
                  </th>
                  <th className="py-4 px-4 text-xs font-black text-slate-950 bg-[#38b6ff] uppercase tracking-wider w-1/4 rounded-t-xl text-center shadow-lg">
                    ⭐ NIDADS Job Bootcamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#152d4e]/70">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white text-xs sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 text-xs sm:text-sm">
                      {row.selfStudy}
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 text-xs sm:text-sm">
                      {row.college}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-[#38b6ff] bg-[#38b6ff]/10 text-center text-xs sm:text-sm border-x border-[#38b6ff]/20">
                      {row.nidads}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-by-Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2.5">
              <div className="font-bold text-gray-300 text-sm border-b border-white/10 pb-2">
                1. Self-Study (YouTube / Random Tutorials)
              </div>
              <div className="text-xs text-gray-400 space-y-1.5">
                <div>&bull; <strong>Cost:</strong> ₹0, but 2+ years wasted in tutorial hell</div>
                <div>&bull; <strong>Doubt Support:</strong> Zero, stuck for days on minor bugs</div>
                <div>&bull; <strong>Job Odds:</strong> Under 5% success rate through cold applications</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2.5">
              <div className="font-bold text-gray-300 text-sm border-b border-white/10 pb-2">
                2. Traditional College Degrees / Masters
              </div>
              <div className="text-xs text-gray-400 space-y-1.5">
                <div>&bull; <strong>Cost:</strong> ₹10 Lakhs - ₹16 Lakhs tuition</div>
                <div>&bull; <strong>Time:</strong> 3-4 Years of outdated theoretical syllabi</div>
                <div>&bull; <strong>Job Odds:</strong> 35-40% mass IT hiring with 3-4 LPA caps</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0d233e] to-[#081728] border-2 border-[#38b6ff] space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#38b6ff]/30 pb-2">
                <span className="font-black text-white text-base">3. NIDADS Job Bootcamp</span>
                <span className="text-[10px] bg-[#38b6ff] text-slate-950 font-black px-2 py-0.5 rounded-full">
                  BEST ROI
                </span>
              </div>
              <div className="text-xs text-slate-200 space-y-2">
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Cost &amp; ROI:</strong> Affordable easy EMIs with ₹12+ LPA target CTC</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Duration:</strong> 36 Weeks (9 Months) Accelerated, Job-Ready</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Mentorship:</strong> 1:1 Live screen-share doubt help + MAANG Data Leads</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Placement Track Record:</strong> 98% placement rate across 500+ hiring partners</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
