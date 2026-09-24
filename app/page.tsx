'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SubNav from '@/components/SubNav';
import HiringPartners from '@/components/HiringPartners';
import WhyBootcamp from '@/components/WhyBootcamp';
import Curriculum from '@/components/Curriculum';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import PlacementEcosystem from '@/components/PlacementEcosystem';
import SuccessStories from '@/components/SuccessStories';
import CertificationSection from '@/components/CertificationSection';
import FAQSection from '@/components/FAQSection';
import LeadModal from '@/components/LeadModal';
import MobileStickyBar from '@/components/MobileStickyBar';
import WhatsAppButton from '@/components/WhatsAppButton';
import AdminLeadViewer from '@/components/AdminLeadViewer';

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: 'Book Free 1-on-1 Career Counselling',
    subtitle: 'Get personalized career roadmap + detailed syllabus directly on WhatsApp',
    source: 'General CTA',
  });

  const openCustomModal = (title?: string, subtitle?: string, source?: string) => {
    setModalConfig({
      title: title || 'Book Free 1-on-1 Career Counselling',
      subtitle: subtitle || 'Get personalized career roadmap + detailed syllabus directly on WhatsApp',
      source: source || 'General CTA',
    });
    setModalOpen(true);
  };

  const handleLeadSuccess = (leadData: any) => {
    console.log('Lead submitted successfully:', leadData);
  };

  return (
    <div id="top" className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col selection:bg-[#38b6ff] selection:text-[#050b14]">
      {/* 1. Dedicated Isolated Navbar */}
      <Navbar onOpenModal={() => openCustomModal('Request Immediate Callback', 'Our senior advisor will call you within 15 minutes', 'Navbar CTA')} />

      {/* 2. Hero Section with Above-the-fold Lead Form */}
      <HeroSection onLeadSuccess={handleLeadSuccess} />

      {/* 3. Sticky Sub Navigation Bar */}
      <SubNav onOpenModal={() => openCustomModal('Claim Early Bird Scholarship', 'Limited seats available for upcoming cohort', 'SubNav CTA')} />

      {/* 4. Hiring Partners Logo Strip (500+ Enterprises) */}
      <HiringPartners />

      {/* 5. Why Choose NIDADS */}
      <WhyBootcamp />

      {/* 6. AI-Infused Curriculum Section */}
      <Curriculum onDownloadSyllabus={() => openCustomModal('Download Complete Syllabus (PDF)', 'Enter your details to receive the module-wise PDF brochure on WhatsApp', 'Curriculum Download')} />

      {/* 7. Real-World Projects Showcase */}
      <ProjectsShowcase />

      {/* 8. Placement & Career Support Blueprint */}
      <PlacementEcosystem onOpenModal={() => openCustomModal('Speak to Placement Advisor', 'Learn about placement policies, minimum CTC criteria & hiring partners', 'Placement CTA')} />

      {/* 9. Student Testimonials & Salary Hikes */}
      <SuccessStories />

      {/* 10. Recognized Certification Preview */}
      <CertificationSection onOpenModal={() => openCustomModal('Certification Details & Eligibility', 'Check your eligibility criteria for the NIDADS verified certificate', 'Cert CTA')} />

      {/* 12. Objection-Clearing FAQ Section */}
      <FAQSection onOpenModal={() => openCustomModal('Admissions Query Support', 'Clarify your questions directly with an academic counsellor', 'FAQ CTA')} />

      {/* 13. Pre-Footer High-Impact Conversion Card */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#07111e] to-[#050b14] border-t border-[#152d4e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#38b6ff]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-[#38b6ff] text-xs font-bold uppercase tracking-wider">
            Admissions Closing Soon
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Accelerate Your <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              Data Science Career with NIDADS?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Join 25,000+ successful learners who transformed their careers. Enroll in online interactive live sessions or visit our Delhi Center in Greater Kailash II.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openCustomModal('Apply for Next Cohort', 'Reserve your seat before the cohort fills up', 'PreFooter CTA')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#38b6ff]/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
            >
              Apply Now &amp; Book Free Counselling
            </button>
            <a
              href="tel:+919205436796"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#07111e] hover:bg-[#0a1626] border border-[#152d4e] text-white font-bold text-sm sm:text-base transition-colors flex items-center justify-center"
            >
              Call: +91 92054 36796
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-gray-400 pt-4">
            <span>100% Placement Support</span>
            <span>&bull;</span>
            <span>Flexible Weekend &amp; Evening Batches</span>
            <span>&bull;</span>
            <span>Online &amp; Classroom Batches</span>
          </div>
        </div>
      </section>

      {/* 14. Isolated Footer (Zero Outbound Leaks with mobile bottom clearance) */}
      <footer className="bg-[#03070d] border-t border-[#152d4e] pt-8 sm:pt-10 pb-24 sm:pb-10 text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://www.nidads.com/Nidads-2.webp"
                alt="NIDADS Logo"
                className="h-8 w-auto object-contain brightness-110"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-white font-bold text-base tracking-tight">NIDADS ACADEMY</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-400 text-xs text-center">
              <span>Savitri Cinema, Space Time Building, GK-II, New Delhi 110048</span>
              <span className="hidden sm:inline">&bull;</span>
              <a href="tel:+919205436796" className="hover:text-white font-medium">+91 92054 36796</a>
              <span className="hidden sm:inline">&bull;</span>
              <span>info@nidads.com</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 leading-relaxed text-center md:text-left">
            Disclaimer: Program outcomes and salary hikes depend on student dedication, project submissions, technical assessment performance, and interview preparation. 100% placement support indicates continuous mentorship, profile optimization, and referral drives through our network of 500+ hiring partners.
          </p>

          <div className="pt-4 border-t border-[#152d4e]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
            <div className="text-center sm:text-left">&copy; {new Date().getFullYear()} National Institute of Data Analytics &amp; Data Science (NIDADS). All rights reserved.</div>
            
            {/* Built-in Admin Lead Access */}
            <AdminLeadViewer />
          </div>
        </div>
      </footer>

      {/* 15. Global Lead Capture Popup Modal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalConfig.title}
        subtitle={modalConfig.subtitle}
        sourceTag={modalConfig.source}
        onSuccess={handleLeadSuccess}
      />

      {/* 16. Mobile Floating Bottom Bar for High Ads Conversion */}
      <MobileStickyBar onOpenModal={() => openCustomModal('Book Free Counselling & Syllabus', 'Instant WhatsApp callback and detailed syllabus', 'Mobile Sticky CTA')} />

      {/* 17. WhatsApp Floating Trigger Button */}
      <WhatsAppButton />
    </div>
  );
}
