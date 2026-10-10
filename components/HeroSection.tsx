'use client';

import React, { useState, useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';
import AutoCarousel from '@/components/AutoCarousel';
import BrandLogo from '@/components/BrandLogo';

interface HeroSectionProps {
  onLeadSuccess: (data: any) => void;
}

export default function HeroSection({ onLeadSuccess }: HeroSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: 'Data Science & AI Bootcamp',
    experience: 'Working Professional - Non Technical',
    mode: 'Online Live Interactive Batch',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Capture ad attribution parameters immediately on page visit
  useEffect(() => {
    captureAttribution();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Check device rate limit: Max 2 submissions per 60 seconds
    const now = Date.now();
    let subTimes: number[] = [];
    try {
      subTimes = JSON.parse(localStorage.getItem('nidads_lead_sub_times') || '[]');
    } catch {
      subTimes = [];
    }
    const recentSubmissions = subTimes.filter((t: number) => now - t < 60000);
    if (recentSubmissions.length >= 2) {
      const waitSeconds = Math.max(1, Math.ceil((recentSubmissions[0] + 60000 - now) / 1000));
      setErrorMessage(`1 minute ke andar same device se maximum 2 baar lead submit ki ja sakti hai. Kripya ${waitSeconds} second baad try karein.`);
      return;
    }

    setLoading(true);

    try {
      let deviceId = '';
      try {
        deviceId = localStorage.getItem('nidads_device_id') || '';
        if (!deviceId) {
          deviceId = 'dev_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
          localStorage.setItem('nidads_device_id', deviceId);
        }
      } catch {
        // Fallback if cookies/localStorage disabled
      }

      const attr = captureAttribution();

      const payload = {
        ...formData,
        deviceId,
        source: 'Hero Form',
        adPlatform: attr.adPlatform,
        utm_source: attr.utm_source,
        utm_medium: attr.utm_medium,
        utm_campaign: attr.utm_campaign,
        utm_content: attr.utm_content,
        utm_term: attr.utm_term,
        utm_id: attr.utm_id,
        gclid: attr.gclid,
        fbclid: attr.fbclid,
        gad_source: attr.gad_source,
        gbraid: attr.gbraid,
        wbraid: attr.wbraid,
        referrer: attr.referrer,
        landing_page_url: attr.landing_page_url || (typeof window !== 'undefined' ? window.location.href : undefined),
        timestamp: new Date().toISOString(),
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json().catch(() => null);

      if (res.status === 429) {
        setErrorMessage(resData?.message || '1 minute ke andar same device se maximum 2 leads submit ho sakti hain. Kripya thoda intezaar karein.');
        return;
      }

      if (!res.ok) {
        setErrorMessage(resData?.error || 'Lead submit nahi ho payi. Kripya dubara try karein.');
        return;
      }

      // Record successful submission timestamp for this device
      recentSubmissions.push(now);
      localStorage.setItem('nidads_lead_sub_times', JSON.stringify(recentSubmissions));

      const existingLeads = JSON.parse(localStorage.getItem('nidads_leads') || '[]');
      existingLeads.unshift({
        ...formData,
        source: 'Hero Form',
        date: new Date().toLocaleString(),
      });
      localStorage.setItem('nidads_leads', JSON.stringify(existingLeads));

      setSubmitted(true);
      onLeadSuccess(formData);

      // Trigger automatic brochure download based on course selection
      try {
        const downloadFile = (url: string, filename: string) => {
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        if (formData.course === 'Data Analytics Bootcamp') {
          downloadFile('/nidads-data-analytics-brochure.pdf', 'NIDADS-Data-Analytics-Course-Brochure.pdf');
        } else if (formData.course.includes('Both')) {
          downloadFile('/nidads-data-science-brochure.pdf', 'NIDADS-Data-Science-Course-Brochure.pdf');
          setTimeout(() => {
            downloadFile('/nidads-data-analytics-brochure.pdf', 'NIDADS-Data-Analytics-Course-Brochure.pdf');
          }, 700);
        } else {
          downloadFile('/nidads-data-science-brochure.pdf', 'NIDADS-Data-Science-Course-Brochure.pdf');
        }
      } catch (dlErr) {
        console.warn('Auto-download prevented:', dlErr);
      }
    } catch (err) {
      console.error('Lead submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="overview" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-[#050b14]">
      {/* Background NIDADS Cyan & Indigo Glows */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-[#38b6ff]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#5478ff]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* On desktop: 2-column grid. On mobile: show the lead form before the headline. */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
          
          {/* 1. Header Portion (Headline & Subhead) */}
          <div className="w-full lg:col-span-7 space-y-4 sm:space-y-6 order-2 lg:order-1">
            
            {/* Mode Selector / Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/40 text-[#38b6ff] text-xs sm:text-sm font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#38b6ff] animate-ping shrink-0"></span>
                <span>Next Cohort Starting Soon &bull; 25 Seats Only</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300">
                <span className="text-[#38b6ff] font-semibold">Online Live</span>
                <span className="text-gray-500">&bull;</span>
                <span className="text-[#ffbf5f] font-semibold">Offline (Delhi)</span>
              </div>
            </div>

            {/* Main NIDADS Punchy Title */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
              Master <span className="text-[#38b6ff]">Data Science</span> &amp; <br className="hidden xs:inline" />
              <span className="text-white">Data Analytics</span> with{' '}
              <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            {/* Sub-Headline */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              India&apos;s premier <strong>Job Bootcamp with Placement Support</strong> — covering Python, SQL, Machine Learning, Power BI, and modern AI workflows through live industry projects for beginners &amp; working professionals.
            </p>

            {/* Value Pillars List (Visible here on Desktop, order changes on mobile) */}
            <div className="hidden lg:grid grid-cols-2 gap-3.5 pt-1">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-base text-gray-200 font-medium">
                  <strong>100% Placement Support</strong> until you land your dream job
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-base text-gray-200 font-medium">
                  <strong>1-on-1 Doubt Support</strong> 
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-base text-gray-200 font-medium">
                  <strong>20+ Industry Projects</strong> with real business datasets
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-base text-gray-200 font-medium">
                  <strong>Govt &amp; Industry Recognized</strong> NIDADS verified certificate
                </span>
              </div>
            </div>

            {/* NIDADS Official Stats Strip (Visible here on Desktop) */}
            <div className="hidden lg:grid grid-cols-4 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#38b6ff]">25,000+</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">Students Trained</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">98%</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">Success Rate</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#46d9ff]">500+</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">Hiring Partners</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">15+</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">Years Experience</div>
              </div>
            </div>

            {/* Top Hiring Companies & Alumni Success Strip (Fills desktop left space) */}
            <div className="hidden lg:block p-4 rounded-2xl bg-white border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                  Alumni Work At Top Tech Giants &amp; MNCs:
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <span>★</span> 4.9/5 Rating (3,200+ Reviews)
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                {[
                  { name: 'Google', domain: 'google.com' },
                  { name: 'Microsoft', domain: 'microsoft.com' },
                  { name: 'Amazon', domain: 'amazon.com' },
                  { name: 'Deloitte', domain: 'deloitte.com' },
                  { name: 'Fractal', domain: 'fractal.ai' },
                  { name: 'Infosys', domain: 'infosys.com' },
                  { name: 'AmEx', domain: 'americanexpress.com' },
                ].map((co) => (
                  <div key={co.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700">
                    <BrandLogo name={co.name} domain={co.domain} size={15} />
                    <span>{co.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 2. Form Column: visible immediately on mobile and beside the headline on desktop. */}
          <div className="w-full lg:col-span-5 order-1 lg:order-2">
            <div className="hero-lead-form-dark relative rounded-3xl bg-[#07111e] p-5 sm:p-6 lg:p-6 border border-[#1e3c66] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              
              <div className="text-center mb-3 sm:mb-4">
                <div className="inline-block px-3 py-0.5 rounded-full bg-[#38b6ff]/15 border border-[#38b6ff]/40 text-[#38b6ff] text-[11px] font-black uppercase tracking-wider mb-1.5">
                  LIMITED SEATS!
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Speak To Our Counsellor
                </h3>
                <p className="lead-form-subtext text-xs sm:text-sm text-gray-300 mt-0.5">
                  Fill details to download curriculum &amp; speak to experts.
                </p>
                {/* Social proof urgency counter */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>14 Candidates Requested Call in Last 2 Hours</span>
                </div>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-white">Thank You! Request Received</h4>
                  <p className="text-sm text-gray-300">
                    Your details have been submitted successfully. Senior Career Counsellor from NIDADS will call you shortly.
                  </p>

                  {/* Post-submission Brochure Choice & Download Buttons */}
                  <div className="pt-2 space-y-3 bg-[#050b14]/80 p-4 rounded-2xl border border-[#162c4d]">
                    <p className="text-xs font-bold text-[#38b6ff] uppercase tracking-wider">
                      Select Course Brochure to Download:
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      <a
                        href="/nidads-data-science-brochure.pdf"
                        download="NIDADS-Data-Science-Course-Brochure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38b6ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#38b6ff]/20 transition-all hover:scale-[1.01] cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span>📘</span>
                          <span>Data Science &amp; AI Brochure</span>
                        </span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-extrabold">Download PDF</span>
                      </a>
                      <a
                        href="/nidads-data-analytics-brochure.pdf"
                        download="NIDADS-Data-Analytics-Course-Brochure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#2dd4bf] hover:from-[#115e59] hover:to-[#14b8a6] text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span>📊</span>
                          <span>Data Analytics &amp; AI Brochure</span>
                        </span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-extrabold">Download PDF</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          const dl = (url: string, file: string) => {
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = file;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          };
                          dl('/nidads-data-science-brochure.pdf', 'NIDADS-Data-Science-Course-Brochure.pdf');
                          setTimeout(() => dl('/nidads-data-analytics-brochure.pdf', 'NIDADS-Data-Analytics-Course-Brochure.pdf'), 600);
                        }}
                        className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.01] cursor-pointer w-full"
                      >
                        <span className="flex items-center gap-2">
                          <span>📚</span>
                          <span>Download Both (Science + Analytics)</span>
                        </span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-extrabold">Download All</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#38b6ff] font-semibold underline hover:text-white pt-2 cursor-pointer inline-block"
                  >
                    Submit another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050b14] border border-[#162c4d] text-white text-sm sm:text-base focus:bg-[#081424] focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/25 transition-all placeholder:text-gray-500 font-medium"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul.sharma@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050b14] border border-[#162c4d] text-white text-sm sm:text-base focus:bg-[#081424] focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/25 transition-all placeholder:text-gray-500 font-medium"
                    />
                  </div>

                  {/* WhatsApp Mobile Number with +91 Prefix */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-1">WhatsApp Mobile Number *</label>
                    <div className="flex items-center">
                      <div className="bg-[#0d1f35] border border-r-0 border-[#162c4d] rounded-l-xl px-3 py-2.5 text-[#38b6ff] text-sm sm:text-base font-bold flex items-center select-none">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        placeholder="10-digit phone number"
                        className="w-full px-3.5 py-2.5 rounded-r-xl bg-[#050b14] border border-[#162c4d] text-white text-sm sm:text-base focus:bg-[#081424] focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/25 transition-all placeholder:text-gray-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Select Course */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-1">Select Course *</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050b14] border border-[#162c4d] text-white text-sm sm:text-base focus:bg-[#081424] focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/25 transition-all font-medium cursor-pointer"
                    >
                      <option value="Diploma in Data Science & AI" className="bg-[#050b14] text-white">Diploma in Data Science &amp; AI</option>
                      <option value="Diploma in Data Analytics & AI | Get Job-Ready" className="bg-[#050b14] text-white">Diploma in Data Analytics &amp; AI | Get Job-Ready</option>
                      <option value="Advanced Certificate in Data Science & AI Program" className="bg-[#050b14] text-white">Advanced Certificate in Data Science &amp; AI Program</option>
                      <option value="Advanced Certificate in Data Analytics & AI Program" className="bg-[#050b14] text-white">Advanced Certificate in Data Analytics &amp; AI Program</option>
                      <option value="Certificate in Data Science & AI" className="bg-[#050b14] text-white">Certificate in Data Science &amp; AI</option>
                      <option value="Certificate in Data Analytics & AI" className="bg-[#050b14] text-white">Certificate in Data Analytics &amp; AI</option>
                      <option value="Applied Data Analytics with Python & SQL" className="bg-[#050b14] text-white">Applied Data Analytics with Python &amp; SQL</option>
                      <option value="Business Intelligence with Power BI" className="bg-[#050b14] text-white">Business Intelligence with Power BI</option>
                      <option value="Data Science for Product Managers" className="bg-[#050b14] text-white">Data Science for Product Managers</option>
                      <option value="Advanced Data Visualization" className="bg-[#050b14] text-white">Advanced Data Visualization</option>
                      <option value="Degree Program in Artificial Intelligence" className="bg-[#050b14] text-white">Degree Program in Artificial Intelligence</option>
                      <option value="Post Graduation Program in Artificial Intelligence" className="bg-[#050b14] text-white">Post Graduation Program in Artificial Intelligence</option>
                    </select>
                  </div>

                  {/* Background / Current Status */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-200 mb-1">Current Background *</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050b14] border border-[#162c4d] text-white text-sm sm:text-base focus:bg-[#081424] focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/25 transition-all font-medium cursor-pointer"
                    >
                      <option value="Working Professional - Tech" className="bg-[#050b14] text-white">Working Professional (Tech)</option>
                      <option value="Working Professional - Non Tech" className="bg-[#050b14] text-white">Working Professional (Non-Tech)</option>
                      <option value="College Student - Final Year" className="bg-[#050b14] text-white">College Student (Final Year)</option>
                      <option value="College Student - 1st to 3rd Year" className="bg-[#050b14] text-white">College Student (1st to 3rd Year)</option>
                      <option value="Fresher / Job Seeker" className="bg-[#050b14] text-white">Fresher / Job Seeker</option>
                      <option value="Career Gap / Transition" className="bg-[#050b14] text-white">Career Gap / Transition</option>
                      <option value="Others" className="bg-[#050b14] text-white">Others</option>
                    </select>
                  </div>

                  {/* WhatsApp Syllabus Consent Checkbox */}
                  <div className="flex items-start gap-2 pt-0.5">
                    <input
                      type="checkbox"
                      id="hero_whatsapp_consent"
                      defaultChecked
                      className="mt-0.5 h-3.5 w-3.5 rounded border-[#162c4d] bg-[#050b14] text-[#0284c7] focus:ring-[#0284c7] cursor-pointer"
                    />
                    <label htmlFor="hero_whatsapp_consent" className="text-[11px] text-gray-300 leading-snug cursor-pointer select-none">
                      Send me 2026 AI-integrated syllabus PDF &amp; fee discounts on WhatsApp.
                    </label>
                  </div>

                  {/* Error / Rate limit Alert */}
                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2 animate-pulse">
                      <span className="shrink-0 text-sm font-bold">⚠️</span>
                      <span className="leading-relaxed">{errorMessage}</span>
                    </div>
                  )}

                  {/* CTA Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#009bd7] to-[#38b6ff] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-black text-sm sm:text-base shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting details...
                      </span>
                    ) : (
                      <span>Book A Free Session</span>
                    )}
                  </button>

                  {/* Trust Footer */}
                  <div className="lead-form-trust flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] text-gray-400 pt-0.5">
                    <span className="text-gray-300 font-medium">100% Privacy</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span>No Spam Calls</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span>Instant WhatsApp Brochure</span>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* 3. Mobile-only Pillars & Stats (shown below the form on mobile so the form is never pushed down!) */}
          <div className="w-full lg:hidden space-y-4 pt-2 order-3">
            <h3 className="text-lg sm:text-xl font-bold text-white text-center pt-2">Why 25,000+ Students Trust NIDADS</h3>
            <AutoCarousel desktopClassName="hidden" mobileClassName="lg:hidden">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm text-gray-200 font-medium">
                  <strong>100% Placement Support</strong> until you land your dream job
                </span>
                </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm text-gray-200 font-medium">
                  <strong>1-on-1 Doubt Support</strong> 
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm text-gray-200 font-medium">
                  <strong>20+ Industry Projects</strong> with real business datasets
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm text-gray-200 font-medium">
                  <strong>Govt &amp; Industry Recognized</strong> NIDADS verified certificate
                </span>
              </div>
            </AutoCarousel>

            {/* Mobile Stats 2x2 */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-2xl font-extrabold text-[#38b6ff]">25,000+</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Students Trained</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-2xl font-extrabold text-emerald-400">98%</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Success Rate</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-2xl font-extrabold text-[#46d9ff]">500+</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Hiring Partners</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-2xl font-extrabold text-amber-400">15+</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Years Experience</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
