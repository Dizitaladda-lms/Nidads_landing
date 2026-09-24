'use client';

import React from 'react';

export default function MentorsSection() {
  const mentors = [
    {
      name: 'Arjun Mehta',
      role: 'Staff Machine Learning Engineer',
      company: 'Ex-Google / Meta',
      exp: '11+ Years Exp',
      topics: 'System Design & Deep Learning',
      initials: 'AM',
      bg: 'from-[#0284c7] to-[#38b6ff]',
    },
    {
      name: 'Dr. Shruti Sen',
      role: 'Principal Data Scientist',
      company: 'Amazon AWS',
      exp: '9+ Years Exp',
      topics: 'Machine Learning & Applied Analytics',
      initials: 'SS',
      bg: 'from-[#38b6ff] to-[#5478ff]',
    },
    {
      name: 'Rohan Verma',
      role: 'Lead AI Architect',
      company: 'Microsoft',
      exp: '12+ Years Exp',
      topics: 'Scalable MLOps & Cloud Pipelines',
      initials: 'RV',
      bg: 'from-[#0369a1] to-[#0284c7]',
    },
    {
      name: 'Neha Chawla',
      role: 'Senior Engineering Manager',
      company: 'Uber Global',
      exp: '8+ Years Exp',
      topics: 'Mock Interviews & Career Coaching',
      initials: 'NC',
      bg: 'from-[#5478ff] to-[#46d9ff]',
    },
  ];

  return (
    <section id="mentors" className="py-16 sm:py-20 bg-[#07111e] border-t border-[#152d4e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff] mb-3">
            World-Class Mentorship
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn Directly from <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              Engineers at Top Tech Giants
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3">
            NIDADS instructors work in live production environments and interview candidates for tier-1 data roles.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((m, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0a1626] border border-[#152d4e] p-6 text-center hover:border-[#38b6ff]/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38b6ff]/10"
            >
              {/* Mentor Avatar */}
              <div
                className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr ${m.bg} flex items-center justify-center text-white font-extrabold text-2xl shadow-lg mb-4`}
              >
                {m.initials}
              </div>

              <h3 className="text-base font-bold text-white mb-0.5">{m.name}</h3>
              <p className="text-xs text-[#38b6ff] font-semibold mb-1">{m.role}</p>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300 font-medium mb-3">
                {m.company}
              </div>

              <div className="pt-3 border-t border-[#152d4e] space-y-1 text-xs text-gray-400">
                <div>
                  <span className="text-gray-400">Specialization:</span> {m.topics}
                </div>
                <div className="text-[#38b6ff] font-medium">{m.exp}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
