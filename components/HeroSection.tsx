'use client';

import React, { useState, useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';
import AutoCarousel from '@/components/AutoCarousel';
import BrandLogo from '@/components/BrandLogo';

interface HeroSectionProps {
  onLeadSuccess: (data: any) => void;
}

export default function HeroSection({ onLeadSuccess }: HeroSectionProps) {
  // 3-Step Assessment Form State
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: 'Diploma in Data Science & AI',
    experience: 'Working Professional (Non-Tech)',
    targetSalary: '₹12 - 18 LPA (Data Scientist)',
    mode: 'Online Live Interactive Batch',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Capture ad attribution parameters immediately on page visit
  useEffect(() => {
    captureAttribution();
  }, []);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setStep(3);
  };

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
        // Fallback
      }

      const attr = captureAttribution();

      const remarks = `Assessment Lead | Target: ${formData.targetSalary} | Mode: ${formData.mode}`;

      const payload = {
        ...formData,
        deviceId,
        remarks,
        source: 'Hero Multi-Step Assessment',
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
        source: 'Hero Multi-Step Assessment',
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

        if (formData.course.includes('Analytics')) {
          downloadFile('/nidads-data-analytics-brochure.pdf', 'NIDADS-Data-Analytics-Course-Brochure.pdf');
        } else {
          downloadFile('/nidads-data-science-brochure.pdf', 'NIDADS-Data-Science-Course-Brochure.pdf');
        }
      } catch (dlErr) {
        console.warn('Auto-download prevented:', dlErr);
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      setErrorMessage('Submission error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="overview" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 overflow-hidden bg-[#050b14]">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#38b6ff]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 right-4 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#5478ff]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-column layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
          
          {/* Left Column: Outcome-First Copy, Proof & Authority (Desktop order 1, Mobile order 2) */}
          <div className="w-full lg:col-span-7 space-y-5 sm:space-y-6 order-2 lg:order-1">
            
            {/* Top Cohort Urgency Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/40 text-[#38b6ff] text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#38b6ff] animate-ping shrink-0" />
                <span>Next Cohort Starting Sunday &bull; 25 Seats Only</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-gray-300">
                <span className="text-[#38b6ff]">Online Live</span>
                <span className="text-gray-500">&bull;</span>
                <span className="text-amber-400">Classroom (Delhi GK-II)</span>
              </div>
            </div>

            {/* Outcome-First Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Stop Applying For Jobs. <br className="hidden xs:inline" />
              <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
                Start Getting Recruited.
              </span>
            </h1>

            {/* The Monday Morning Upgrade Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-sm sm:text-base">
              <span>🚀 Transition to a ₹12 LPA+ Data &amp; AI Role in 36 Weeks</span>
            </div>

            {/* Sub-Headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              India&apos;s premier <strong>Job Bootcamp with Placement Support</strong> — master Python, SQL, Power BI, Machine Learning &amp; Custom LLMs through 20+ live client datasets with 1-on-1 mentorship from Amazon &amp; Deloitte leads.
            </p>

            {/* Value Pillars List (Desktop) */}
            <div className="hidden lg:grid grid-cols-2 gap-3.5 pt-1">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-emerald-400 font-black text-base shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  <strong>100% Placement Support</strong> until you sign your dream offer letter
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-black text-base shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  <strong>24/7 1-on-1 Doubt Help</strong> via live screen-sharing
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-black text-base shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  <strong>20+ Industry GitHub Projects</strong> with real business datasets
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-amber-400 font-black text-base shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  <strong>Direct HR Referrals</strong> across 500+ Hiring Partner companies
                </span>
              </div>
            </div>

            {/* Verified Track Record Stats */}
            <div className="hidden lg:grid grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-[#38b6ff]">25,000+</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Students Trained</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-emerald-400/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">98%</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Placement Rate</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-amber-400/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">₹12.4 LPA</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Avg Starting CTC</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#46d9ff]/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-[#46d9ff]">500+</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Hiring Partners</div>
              </div>
            </div>

            {/* Hiring Companies Bar */}
            <div className="hidden lg:block p-4 rounded-2xl bg-white border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                  Alumni Work At Top Tech Giants &amp; MNCs:
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  98% Verified Placements
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

          {/* Right Column: Multi-Step Career Assessment Quiz (Desktop order 2, Mobile order 1) */}
          <div className="w-full lg:col-span-5 order-1 lg:order-2">
            <div className="hero-lead-form-dark relative rounded-3xl bg-[#07111e] p-5 sm:p-6 lg:p-6 border-2 border-[#1e3c66] shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              
              {/* Card Header & Urgency Ticker */}
              <div className="text-center mb-3">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-black uppercase tracking-wider mb-1.5">
                  ⚡ 60-SEC CAREER ASSESSMENT
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Get Your Custom Career Roadmap
                </h3>
                <p className="lead-form-subtext text-xs sm:text-sm text-gray-300 mt-0.5">
                  See your salary potential &amp; receive the 2026 syllabus directly on WhatsApp.
                </p>

                {/* Urgency Live Ticker */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>14 Candidates Evaluated in Last 2 Hours</span>
                </div>
              </div>

              {/* Multi-Step Progress Bar */}
              {!submitted && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-1.5">
                    <span className={step >= 1 ? 'text-[#38b6ff]' : ''}>1. Background</span>
                    <span className={step >= 2 ? 'text-[#38b6ff]' : ''}>2. Goal &amp; Program</span>
                    <span className={step >= 3 ? 'text-[#38b6ff]' : ''}>3. Unlock Roadmap</span>
                  </div>
                  <div className="w-full bg-[#0a1626] h-1.5 rounded-full overflow-hidden border border-[#162c4d]">
                    <div
                      style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                      className="bg-gradient-to-r from-[#38b6ff] to-amber-400 h-full rounded-full transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Submitted Thank You State */}
              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-white">Assessment Complete!</h4>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Your personalized career roadmap and salary hike projection are being prepared. An academic advisor will reach out on WhatsApp shortly.
                  </p>

                  {/* Instant Download Options */}
                  <div className="pt-2 space-y-2.5 bg-[#050b14]/90 p-4 rounded-2xl border border-[#162c4d]">
                    <p className="text-xs font-bold text-[#38b6ff] uppercase tracking-wider">
                      Select Course Brochure to Download:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <a
                        href="/nidads-data-science-brochure.pdf"
                        download="NIDADS-Data-Science-Course-Brochure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38b6ff] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                      >
                        <span>📘 Data Science &amp; AI Brochure</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-extrabold">PDF</span>
                      </a>
                      <a
                        href="/nidads-data-analytics-brochure.pdf"
                        download="NIDADS-Data-Analytics-Course-Brochure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                      >
                        <span>📊 Data Analytics &amp; AI Brochure</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-extrabold">PDF</span>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="text-xs text-[#38b6ff] font-semibold underline hover:text-white pt-2 cursor-pointer inline-block"
                  >
                    Calculate for another role
                  </button>
                </div>
              ) : (
                <div>
                  {/* STEP 1: Current Background & Target Salary */}
                  {step === 1 && (
                    <form onSubmit={handleNextStep1} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-gray-200 mb-1.5">
                          1. What is your current background? *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            'Working Professional (Non-Tech)',
                            'Working Professional (Tech)',
                            'College Student / Fresher',
                            'Career Gap / Transition',
                          ].map((item) => (
                            <button
                              type="button"
                              key={item}
                              onClick={() => setFormData({ ...formData, experience: item })}
                              className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                                formData.experience === item
                                  ? 'bg-[#38b6ff]/20 border-[#38b6ff] text-white shadow-sm'
                                  : 'bg-[#050b14] border-[#162c4d] text-gray-300 hover:border-gray-500'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-200 mb-1.5">
                          2. What is your target salary goal? *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: '₹6 - 10 LPA', sub: 'Data Analyst' },
                            { label: '₹12 - 18 LPA', sub: 'Data Scientist' },
                            { label: '₹18 - 25+ LPA', sub: 'AI Specialist' },
                          ].map((item) => (
                            <button
                              type="button"
                              key={item.label}
                              onClick={() =>
                                setFormData({ ...formData, targetSalary: `${item.label} (${item.sub})` })
                              }
                              className={`p-2 rounded-xl text-center transition-all border cursor-pointer ${
                                formData.targetSalary.includes(item.label)
                                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                                  : 'bg-[#050b14] border-[#162c4d] text-gray-300 hover:border-gray-500'
                              }`}
                            >
                              <div className="text-xs font-extrabold text-white">{item.label}</div>
                              <div className="text-[10px] text-gray-400 mt-0.5">{item.sub}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Primary Money CTA Button with Vibrant High Contrast */}
                      <button
                        type="submit"
                        className="w-full mt-3 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center cursor-pointer gap-2"
                      >
                        <span>Next: Select Specialization</span>
                        <span>→</span>
                      </button>

                      <div className="text-center text-[11px] text-gray-400 pt-0.5">
                        Takes less than 30 seconds &bull; Free assessment
                      </div>
                    </form>
                  )}

                  {/* STEP 2: Program & Learning Mode */}
                  {step === 2 && (
                    <form onSubmit={handleNextStep2} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-gray-200 mb-1.5">
                          3. Choose your preferred learning track: *
                        </label>
                        <div className="space-y-2">
                          {[
                            {
                              name: 'Diploma in Data Science & AI',
                              desc: 'Python, ML, Deep Learning, Cloud & Generative AI',
                            },
                            {
                              name: 'Diploma in Data Analytics & AI',
                              desc: 'SQL, Advanced Power BI, Tableau, Python & Automation',
                            },
                            {
                              name: 'Advanced Certificate in Data Science & AI',
                              desc: 'Fast-track specialization for working engineers',
                            },
                          ].map((p) => (
                            <button
                              type="button"
                              key={p.name}
                              onClick={() => setFormData({ ...formData, course: p.name })}
                              className={`w-full p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                                formData.course === p.name
                                  ? 'bg-[#38b6ff]/20 border-[#38b6ff] text-white shadow-sm'
                                  : 'bg-[#050b14] border-[#162c4d] text-gray-300 hover:border-gray-500'
                              }`}
                            >
                              <div className="text-xs font-bold text-white">{p.name}</div>
                              <div className="text-[10px] text-gray-400 mt-0.5">{p.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-200 mb-1.5">
                          4. Learning Mode: *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { title: 'Online Live Batch', sub: 'Interactive Classes' },
                            { title: 'Offline Classroom', sub: 'Delhi GK-II Center' },
                          ].map((m) => (
                            <button
                              type="button"
                              key={m.title}
                              onClick={() => setFormData({ ...formData, mode: m.title })}
                              className={`p-2.5 rounded-xl text-center transition-all border cursor-pointer ${
                                formData.mode === m.title
                                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                  : 'bg-[#050b14] border-[#162c4d] text-gray-300 hover:border-gray-500'
                              }`}
                            >
                              <div className="text-xs font-bold text-white">{m.title}</div>
                              <div className="text-[10px] text-gray-400 mt-0.5">{m.sub}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-4 py-3 rounded-xl bg-[#050b14] border border-[#162c4d] text-gray-300 font-bold text-xs hover:bg-[#0a1626] transition-colors cursor-pointer"
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center cursor-pointer gap-2"
                        >
                          <span>Next: Get My Custom Roadmap</span>
                          <span>→</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: Contact & Instant WhatsApp Delivery */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-200 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#050b14] border border-[#162c4d] text-white text-sm sm:text-base focus:bg-[#081424] focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/25 transition-all placeholder:text-gray-500 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-200 mb-1">
                          WhatsApp Mobile Number *
                        </label>
                        <div className="flex items-center">
                          <div className="bg-[#0d1f35] border border-r-0 border-[#162c4d] rounded-l-xl px-3 py-2.5 text-[#38b6ff] text-sm sm:text-base font-bold flex items-center select-none">
                            +91
                          </div>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                              })
                            }
                            placeholder="10-digit mobile number"
                            className="w-full px-3.5 py-2.5 rounded-r-xl bg-[#050b14] border border-[#162c4d] text-white text-sm sm:text-base focus:bg-[#081424] focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/25 transition-all placeholder:text-gray-500 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-200 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. rahul.sharma@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#050b14] border border-[#162c4d] text-white text-sm sm:text-base focus:bg-[#081424] focus:outline-none focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/25 transition-all placeholder:text-gray-500 font-medium"
                        />
                      </div>

                      {/* WhatsApp Consent */}
                      <div className="flex items-start gap-2 pt-0.5">
                        <input
                          type="checkbox"
                          id="hero_whatsapp_consent"
                          defaultChecked
                          className="mt-0.5 h-3.5 w-3.5 rounded border-[#162c4d] bg-[#050b14] text-amber-500 focus:ring-amber-500 cursor-pointer"
                        />
                        <label
                          htmlFor="hero_whatsapp_consent"
                          className="text-[11px] text-gray-300 leading-snug cursor-pointer select-none"
                        >
                          Send me 2026 AI-integrated syllabus PDF &amp; fee discounts on WhatsApp.
                        </label>
                      </div>

                      {/* Error Alert */}
                      {errorMessage && (
                        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2 animate-pulse">
                          <span className="shrink-0 text-sm font-bold">⚠️</span>
                          <span className="leading-relaxed">{errorMessage}</span>
                        </div>
                      )}

                      {/* High-Contrast Final Submit Button */}
                      <div className="flex gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-4 py-3 rounded-xl bg-[#050b14] border border-[#162c4d] text-gray-300 font-bold text-xs hover:bg-[#0a1626] transition-colors cursor-pointer"
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center cursor-pointer"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                              Generating Roadmap...
                            </span>
                          ) : (
                            <span>Unlock My Career Roadmap &amp; Syllabus →</span>
                          )}
                        </button>
                      </div>

                      {/* Trust badges */}
                      <div className="lead-form-trust flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
                        <span className="text-gray-300 font-medium">100% Privacy</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>No Spam Calls</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>Instant WhatsApp Brochure</span>
                      </div>
                    </form>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Mobile-only Value Pillars & Stats (Order 3 on mobile) */}
          <div className="w-full lg:hidden space-y-4 pt-2 order-3">
            <h3 className="text-lg sm:text-xl font-bold text-white text-center pt-2">
              Why 25,000+ Students Trust NIDADS
            </h3>
            <AutoCarousel desktopClassName="hidden" mobileClassName="lg:hidden">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-emerald-400 font-black text-base shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  <strong>100% Placement Support</strong> until you land your dream job
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-black text-base shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  <strong>24/7 1-on-1 Doubt Help</strong> via live screen-sharing
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-black text-base shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  <strong>20+ Industry GitHub Projects</strong> with real business datasets
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-amber-400 font-black text-base shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  <strong>Direct HR Referrals</strong> across 500+ Hiring Partners
                </span>
              </div>
            </AutoCarousel>

            {/* Mobile Stats 2x2 */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-2xl font-extrabold text-[#38b6ff]">25,000+</div>
                <div className="text-xs text-gray-400 font-medium">Students Trained</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-2xl font-extrabold text-emerald-400">98%</div>
                <div className="text-xs text-gray-400 font-medium">Placement Rate</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-2xl font-extrabold text-amber-400">₹12.4 LPA</div>
                <div className="text-xs text-gray-400 font-medium">Avg Starting CTC</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-2xl font-extrabold text-[#46d9ff]">500+</div>
                <div className="text-xs text-gray-400 font-medium">Hiring Partners</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
