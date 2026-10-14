'use client';

import React from 'react';
import BrandLogo from '@/components/BrandLogo';
import AutoCarousel from '@/components/AutoCarousel';

interface Mentor {
  name: string;
  role: string;
  company: string;
  companyDomain: string;
  previousCompany?: string;
  exp: string;
  specialization: string;
  teachingModule: string;
  photoUrl: string;
  linkedinTag: string;
  quote: string;
}

export default function MentorsSection() {
  const mentors: Mentor[] = [
    {
      name: 'Aman Verma',
      role: 'Ex-Senior Data Scientist',
      company: 'Amazon AWS',
      companyDomain: 'amazon.com',
      previousCompany: 'Flipkart',
      exp: '11+ Years Exp',
      specialization: 'Scalable ML Pipelines, Python & Production MLOps',
      teachingModule: 'Teaches: Phase 3 Machine Learning & AWS Cloud Deployment',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      linkedinTag: 'linkedin.com/in/aman-verma-ds',
      quote: 'I teach students how to write clean, modular production code that passes FAANG technical architecture reviews.',
    },
    {
      name: 'Priya Sharma',
      role: 'Lead Data & BI Architect',
      company: 'Deloitte Consulting',
      companyDomain: 'deloitte.com',
      previousCompany: 'PwC India',
      exp: '9+ Years Exp',
      specialization: 'Advanced SQL, DAX, PowerBI & Business Intelligence',
      teachingModule: 'Teaches: Phase 1 & 2 SQL, Analytics & Executive Storytelling',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      linkedinTag: 'linkedin.com/in/priya-sharma-data',
      quote: 'Data analytics isn’t just charts; it is discovering where the business is losing ₹50 Lakhs and proving how to fix it.',
    },
    {
      name: 'Rohan Singhania',
      role: 'Principal AI Architect',
      company: 'Microsoft',
      companyDomain: 'microsoft.com',
      previousCompany: 'Adobe Research',
      exp: '12+ Years Exp',
      specialization: 'Generative AI, LangChain, Custom LLMs & Multi-Agent Systems',
      teachingModule: 'Teaches: Phase 5 Generative AI & Custom Enterprise LLMs',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      linkedinTag: 'linkedin.com/in/rohan-ai-architect',
      quote: 'We don’t just teach API calls. We teach you how to fine-tune open-source LLMs and build autonomous multi-agent systems.',
    },
    {
      name: 'Dr. Shruti Sen',
      role: 'Staff Machine Learning Engineer',
      company: 'Google / DeepMind Alumni',
      companyDomain: 'google.com',
      previousCompany: 'IIT Delhi (PhD)',
      exp: '10+ Years Exp',
      specialization: 'Deep Learning, NLP Transformers & System Design',
      teachingModule: 'Teaches: Phase 4 Neural Networks & Computer Vision',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      linkedinTag: 'linkedin.com/in/shruti-sen-ml',
      quote: 'Demystifying complex mathematical foundations into intuitive visual intuition so anyone can ace senior FAANG interviews.',
    },
  ];

  return (
    <section id="mentors" className="py-16 sm:py-24 bg-[#07111e] border-t border-[#152d4e] relative overflow-hidden">
      {/* Background Subtle Ambient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#38b6ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-bold text-[#38b6ff] uppercase tracking-wider mb-3">
            <span>Verified Industry Faculty</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Learn Directly from <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              Engineers at Google, Amazon &amp; Microsoft
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-2xl mx-auto">
            No academic professors teaching 10-year-old PowerPoint slides. Our mentors are active data practitioners who build live systems and hire candidates daily.
          </p>
        </div>

        {/* Mentors Grid */}
        <AutoCarousel desktopClassName="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6" mobileClassName="sm:hidden">
          {mentors.map((m, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0a1626] border border-[#162c4d] p-5 sm:p-6 flex flex-col justify-between hover:border-[#38b6ff]/60 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#38b6ff]/10 group"
            >
              <div>
                {/* Photo & Company Logo */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-[#1e3c66] shadow-lg group-hover:border-[#38b6ff] transition-colors bg-slate-800">
                    <img
                      src={m.photoUrl}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  {/* Floating Company Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <BrandLogo name={m.company} domain={m.companyDomain} size={14} />
                    <span className="text-[11px] font-bold text-slate-900">{m.company.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Name & Titles */}
                <div className="text-center pt-2">
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-[#38b6ff] transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-xs font-bold text-[#38b6ff] mt-0.5">{m.role}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{m.company} &bull; {m.exp}</p>
                </div>

                {/* Quote */}
                <div className="mt-4 p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{m.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Module & Specialization */}
              <div className="mt-4 pt-3.5 border-t border-[#152d4e] space-y-2 text-xs">
                <div className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/25 px-2.5 py-1 rounded-lg">
                  {m.teachingModule}
                </div>
                <div className="text-[10px] text-gray-400 text-center">
                  Focus: {m.specialization}
                </div>
              </div>

            </div>
          ))}
        </AutoCarousel>

        {/* 1:1 Mentorship Guarantee Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0a1b30] via-[#0d223d] to-[#0a1b30] border border-[#1e3c66] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#38b6ff]/15 border border-[#38b6ff]/30 text-[11px] font-bold text-[#38b6ff] uppercase tracking-wider">
              Guaranteed 1:1 Access
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Get 10+ Hours of Dedicated 1-on-1 Mock Interviews &amp; Resume Teardowns
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Every learner is paired with a dedicated senior mentor from day one—not shared in a crowded webinar.
            </p>
          </div>
          <a
            href="#overview"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap text-center"
          >
            Book 1:1 Mentor Session
          </a>
        </div>

      </div>
    </section>
  );
}
