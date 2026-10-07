'use client';

import React from 'react';
import AutoCarousel from '@/components/AutoCarousel';

export default function SuccessStories() {
  const videoReviews = [
    {
      title: 'Student Review & Career Transformation',
      subtitle: 'Data Science & AI Bootcamp Graduate',
      videoUrl: '/videos/student-review-1.mp4',
      badge: 'Verified Video Review',
    },
    {
      title: 'Course Experience & Project Feedback',
      subtitle: 'Hands-on Projects & Doubt Clearance',
      videoUrl: '/videos/student-review-2.mp4',
      badge: 'Verified Video Review',
    },
    {
      title: 'Full Bootcamp Learning & Placement Review',
      subtitle: 'Mentorship & Career Transition',
      videoUrl: '/videos/student-review-3.mp4',
      badge: 'Verified Video Review',
    },
  ];

  return (
    <section id="stories" className="py-16 sm:py-20 bg-[#050b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff] mb-3">
            Real Student Feedback
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Watch What Our Students Say <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              Verified Video Reviews &amp; Success Stories
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3">
            Listen directly to our students sharing their live learning experience, project building, and career transformation with NIDADS.
          </p>
        </div>

        {/* Video Reviews Grid */}
        <AutoCarousel desktopClassName="hidden md:grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {videoReviews.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#07111e] border border-[#152d4e] overflow-hidden flex flex-col justify-between hover:border-[#38b6ff]/60 transition-all hover:-translate-y-1 shadow-2xl hover:shadow-[#38b6ff]/20"
            >
              {/* Video Player - 9:16 Vertical Reel Format */}
              <div className="relative w-full aspect-[9/16] bg-black/95 overflow-hidden flex items-center justify-center">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain bg-black"
                >
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Card Meta & Details */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#07111e]">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#38b6ff]/15 border border-[#38b6ff]/30 text-[#38b6ff] font-bold text-[9px] sm:text-xs">
                      {item.badge}
                    </span>
                    <span className="text-xs text-amber-400 font-bold">★ 5.0 / 5.0</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">{item.subtitle}</p>
                </div>

                <div className="pt-3 border-t border-[#152d4e] flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-xs text-gray-400">
                  <span className="font-semibold text-gray-300">NIDADS Alumnus</span>
                  <span className="text-[#38b6ff] font-medium">Verified Review</span>
                </div>
              </div>
            </div>
          ))}
        </AutoCarousel>

      </div>
    </section>
  );
}
