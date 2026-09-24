'use client';

import React from 'react';

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
      title: '1:1 Mentorship from MAANG Experts',
      desc: '10+ personalized mock technical rounds, resume reviews, and portfolio teardowns by leaders from Google, Amazon & Microsoft.',
      badge: 'Top Faculty',
      color: 'border-indigo-500/30 text-indigo-400',
    },
  ];

  return (
    <section id="why" className="py-16 sm:py-20 bg-[#050b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff] mb-3">
            Why 25,000+ Learners Choose NIDADS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Real Career Growth, <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              Not Outdated Academic Theory
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3">
            From foundational statistics to advanced AI, NIDADS offers hands-on programs that transform aspiring analysts into industry leaders.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl bg-[#07111e] border ${item.color} backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38b6ff]/10`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-gray-500 font-mono">
                  {item.num}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
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
        </div>

        {/* Comparison Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#07111e] border border-[#152d4e]">
          <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-6">
            The NIDADS Edge: Us vs. Self-Study / College Degrees
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-gray-400">
              <div className="font-bold text-gray-300 text-sm">Self-Learning (YouTube)</div>
              <p>&bull; Disjointed videos with zero mentorship</p>
              <p>&bull; Nobody to debug your coding errors</p>
              <p>&bull; No verified industry credentials</p>
              <p>&bull; Zero placement or hiring referrals</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-gray-400">
              <div className="font-bold text-gray-300 text-sm">Traditional College</div>
              <p>&bull; Outdated curriculum from years ago</p>
              <p>&bull; Zero practical AI or business datasets</p>
              <p>&bull; Generic mass hiring with 3-4 LPA caps</p>
              <p>&bull; 3-4 years long duration</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-[#38b6ff]/20 to-[#07111e] border border-[#38b6ff]/50 space-y-2 text-gray-200 shadow-xl shadow-[#38b6ff]/10">
              <div className="font-bold text-[#38b6ff] text-sm flex items-center justify-between">
                <span>NIDADS Job Bootcamp</span>
                <span className="text-[10px] bg-[#38b6ff] text-[#050b14] px-2 py-0.5 rounded-full font-extrabold">RECOMMENDED</span>
              </div>
              <p className="text-white font-medium">&bull; 100% Industry-aligned hands-on stack</p>
              <p className="text-white font-medium">&bull; Instant 24/7 1-on-1 doubt resolution</p>
              <p className="text-white font-medium">&bull; 1:1 MAANG mock interviews &amp; resume Polish</p>
              <p className="text-white font-medium">&bull; Direct placement drives across 500+ partner companies</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
