'use client';

import React from 'react';

interface CertProps {
  onOpenModal: () => void;
}

export default function CertificationSection({ onOpenModal }: CertProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#050b14] border-t border-[#152d4e] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Text & Features */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center sm:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff]">
              Industry-Recognized Certification
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get an Industry-Recognized <br />
              <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
                NIDADS Certificate of Excellence
              </span>
            </h2>

            <p className="text-xs sm:text-base text-gray-300 leading-relaxed">
              Upon successful completion of real-world capstone projects and interview evaluations, receive a verified credential that recruiters trust and verify directly on LinkedIn.
            </p>

            <div className="space-y-3 pt-1 text-left">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Full-Stack Data Science &amp; AI Accreditation</div>
                  <div className="text-[11px] sm:text-xs text-gray-400">Curriculum aligned with current industry expectations and corporate analytics standards.</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 sm:gap-3">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Directly Verifiable with Unique Credential ID</div>
                  <div className="text-[11px] sm:text-xs text-gray-400">Employers and HRs can verify your certificate authenticity and projects in 1-click.</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 sm:gap-3">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">1-Click LinkedIn Profile Add</div>
                  <div className="text-[11px] sm:text-xs text-gray-400">Boost your profile ranking in recruiter inbound searches for Data Scientist &amp; Analyst roles.</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenModal}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#38b6ff]/25 transition-all cursor-pointer"
              >
                Claim Certification Info
              </button>
            </div>
          </div>

          {/* Right: Mock Certificate Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1b2f] via-[#07111e] to-[#0a1626] border-2 border-[#38b6ff]/40 p-4 sm:p-7 shadow-2xl shadow-black/80 space-y-3 sm:space-y-4">
              
              {/* Cyan Decor */}
              <div className="flex items-center justify-between border-b border-[#152d4e] pb-3 sm:pb-4 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <img
                    src="https://www.nidads.com/Nidads-2.webp"
                    alt="NIDADS Logo"
                    className="h-6 sm:h-8 w-auto object-contain brightness-110 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-black tracking-wider text-white truncate">NIDADS ACADEMY</div>
                    <div className="text-[8px] sm:text-[9px] text-[#38b6ff] uppercase tracking-widest font-bold">Certificate of Excellence</div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#38b6ff] border border-[#38b6ff]/40 px-2 py-0.5 rounded shrink-0">
                  VERIFIED
                </span>
              </div>

              {/* Certificate Inner Text */}
              <div className="py-2 sm:py-4 text-center space-y-1.5 sm:space-y-2">
                <div className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest">This is to certify that</div>
                <div className="text-base sm:text-2xl font-black text-white tracking-wide border-b border-[#152d4e] pb-2 inline-block px-3 sm:px-4">
                  YOUR NAME HERE
                </div>
                <p className="text-[11px] sm:text-xs text-gray-300 pt-1.5 sm:pt-2 leading-relaxed">
                  has successfully completed the <strong>Advanced Data Science, Machine Learning &amp; AI Engineering Bootcamp</strong>, fulfilling all industry project submissions and technical mock evaluations.
                </p>
              </div>

              {/* Certificate Footer */}
              <div className="flex flex-wrap items-center justify-between pt-3 sm:pt-4 border-t border-[#152d4e] text-[9px] sm:text-[10px] text-gray-400 gap-2">
                <div>
                  <div className="font-bold text-gray-200">AUTHORIZED SIGNATORY</div>
                  <div>Director of Academics &bull; NIDADS</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#38b6ff]">CREDENTIAL ID</div>
                  <div>NIDADS-DS-2026-8849</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
