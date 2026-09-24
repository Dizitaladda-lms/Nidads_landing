'use client';

import React from 'react';

export default function SuccessStories() {
  const stories = [
    {
      name: 'Abhishek Rawat',
      previousRole: 'Operations Analyst (3.8 LPA)',
      currentRole: 'Data Scientist @ Fractal Analytics (14.5 LPA)',
      hike: '+280% Hike',
      quote:
        'The hands-on Python and Machine Learning modules at NIDADS helped me build a solid GitHub portfolio. The 1:1 mentor sessions gave me the confidence to crack Fractal.',
      company: 'Fractal Analytics',
      avatarBg: 'bg-[#0284c7]',
    },
    {
      name: 'Mohit Kumar',
      previousRole: 'B.Tech CS Fresher (0 LPA)',
      currentRole: 'Data Analyst @ American Express (9.5 LPA)',
      hike: 'Fresher Track',
      quote:
        'Learning Power BI, Advanced SQL and Python with live business case studies made all the difference. NIDADS placement cell arranged 4 interviews within a month.',
      company: 'American Express',
      avatarBg: 'bg-[#38b6ff]',
    },
    {
      name: 'Pallavi Yadav',
      previousRole: 'Non-Tech Background (3.5 LPA)',
      currentRole: 'Business Intelligence Analyst @ L&T (11.0 LPA)',
      hike: '+215% Hike',
      quote:
        'Coming from a non-coding stream, I was hesitant at first. But the step-by-step guidance and daily doubt clearance made learning effortless. Truly grateful to the mentors!',
      company: 'L&T Financial',
      avatarBg: 'bg-[#5478ff]',
    },
    {
      name: 'Priya Sharma',
      previousRole: 'QA Tester (4.2 LPA)',
      currentRole: 'AI & Data Analyst @ WNS Global (13.2 LPA)',
      hike: '+214% Hike',
      quote:
        'The modern AI tools and practical frameworks gave me a massive edge in technical interviews over traditional candidates.',
      company: 'WNS Global',
      avatarBg: 'bg-indigo-600',
    },
  ];

  return (
    <section id="stories" className="py-16 sm:py-20 bg-[#050b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff] mb-3">
            Proven Transformations
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real Students. Real Careers. <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              Inspiring NIDADS Success Stories
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3">
            See how students and working professionals from non-tech and technical streams transformed into high-earning Data Scientists.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#07111e] border border-[#152d4e] p-6 sm:p-7 flex flex-col justify-between hover:border-[#38b6ff]/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38b6ff]/10"
            >
              <div>
                {/* Top Row: User & Hike Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full ${item.avatarBg} text-white font-black text-lg flex items-center justify-center shadow-md`}
                    >
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{item.name}</h3>
                      <div className="text-xs text-amber-400 font-semibold mt-0.5">
                        5.0 / 5.0 Verified Review
                      </div>
                    </div>
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/15 border border-[#38b6ff]/30 text-[#38b6ff] font-bold text-xs">
                    {item.hike}
                  </span>
                </div>

                {/* Transition Box */}
                <div className="p-3 rounded-xl bg-[#0a1626] border border-[#152d4e] space-y-1 text-xs mb-4">
                  <div className="text-gray-400">
                    <span className="font-semibold text-gray-300">Previous:</span> {item.previousRole}
                  </div>
                  <div className="text-[#38b6ff] font-bold">
                    <span className="text-gray-300 font-semibold">Placed at:</span> {item.currentRole}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Verified Badge */}
              <div className="mt-5 pt-4 border-t border-[#152d4e] flex items-center justify-between text-xs text-gray-400">
                <span>Verified NIDADS Graduate</span>
                <span className="font-semibold text-[#46d9ff]">{item.company}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
