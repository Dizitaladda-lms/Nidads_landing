'use client';

import React, { useState } from 'react';

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

      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const utm_source = urlParams?.get('utm_source') || undefined;
      const utm_medium = urlParams?.get('utm_medium') || undefined;
      const utm_campaign = urlParams?.get('utm_campaign') || undefined;
      const utm_content = urlParams?.get('utm_content') || undefined;
      const utm_term = urlParams?.get('utm_term') || undefined;

      const payload = {
        ...formData,
        deviceId,
        source: 'Hero Form',
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        landing_page_url: typeof window !== 'undefined' ? window.location.href : undefined,
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
        
        {/* On desktop: 2-column grid. On mobile: stacked with Headline -> Animated Form -> Pillars/Stats */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* 1. Header Portion (Headline & Subhead) */}
          <div className="w-full lg:col-span-7 space-y-4 sm:space-y-6 order-1">
            
            {/* Mode Selector / Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/40 text-[#38b6ff] text-[11px] sm:text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#38b6ff] animate-ping shrink-0"></span>
                <span>Next Cohort Starting Soon &bull; 25 Seats Only</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-medium text-gray-300">
                <span className="text-[#38b6ff] font-semibold">Online Live</span>
                <span className="text-gray-500">&bull;</span>
                <span className="text-[#ffbf5f] font-semibold">Offline (Delhi)</span>
              </div>
            </div>

            {/* Main NIDADS Punchy Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
              Master <span className="text-[#38b6ff]">Data Science</span> &amp; <br className="hidden xs:inline" />
              <span className="text-white">Data Analytics</span> with{' '}
              <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>

            {/* Sub-Headline */}
            <p className="text-xs sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              India&apos;s premier <strong>Job Bootcamp with Placement Support</strong> — covering Python, SQL, Machine Learning, Power BI, and modern AI workflows through live industry projects for beginners &amp; working professionals.
            </p>

            {/* Value Pillars List (Visible here on Desktop, order changes on mobile) */}
            <div className="hidden lg:grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  <strong>100% Placement Support</strong> until you land your dream job
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  <strong>24/7 1-on-1 Doubt Support</strong> via Live Chat &amp; Screen Share
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  <strong>20+ Industry Projects</strong> with real business datasets
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  <strong>Govt &amp; Industry Recognized</strong> NIDADS verified certificate
                </span>
              </div>
            </div>

            {/* NIDADS Official Stats Strip (Visible here on Desktop) */}
            <div className="hidden lg:grid grid-cols-4 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl font-extrabold text-[#38b6ff]">15,000+</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Students Trained</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl font-extrabold text-emerald-400">98%</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Success Rate</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl font-extrabold text-[#46d9ff]">500+</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Hiring Partners</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111e] border border-[#152d4e] text-center hover:border-[#38b6ff]/40 transition-colors">
                <div className="text-2xl font-extrabold text-amber-400">15+</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Years Experience</div>
              </div>
            </div>

          </div>

          {/* 2. Form Column: HIGH-CONVERTING ANIMATED ATTRACT FORM (order-2 on mobile so it is right below headline!) */}
          <div className="w-full lg:col-span-5 order-2">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#0a1626] to-[#07111e] p-4 sm:p-7 border border-[#38b6ff]/60 form-attract-pulse">
              
              {/* Animated Shimmer Badge above form */}
              <div className="relative overflow-hidden inline-flex items-center gap-1.5 bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] text-white font-black text-[11px] sm:text-xs uppercase px-3.5 py-1.5 rounded-full shadow-lg shadow-[#38b6ff]/40 mb-3 -mt-6 sm:-mt-8 mx-auto table">
                <span className="badge-shimmer"></span>
                <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-ping"></span>
                <span>Fast-Filling Batch &bull; Free Career Counselling</span>
              </div>

              <div className="text-center mb-3 sm:mb-5">
                <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                  Talk to a Senior Career Advisor
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Get personalized roadmap + detailed curriculum delivered on WhatsApp
                </p>
                {/* Social proof urgency counter */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>14 Candidates Requested Call in Last 2 Hours</span>
                </div>
              </div>

              {submitted ? (
                <div className="py-6 sm:py-8 text-center space-y-3 sm:space-y-4">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-xl sm:text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">Thank You! Request Received</h4>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Your official course brochure download has started. Our Senior Career Counsellor from NIDADS will also call you shortly to guide you.
                  </p>

                  {/* Dual Brochure Download Buttons */}
                  <div className="pt-2 space-y-2">
                    <p className="text-xs font-semibold text-gray-300">Download Official Course Brochures:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href="/nidads-data-science-brochure.pdf"
                        download="NIDADS-Data-Science-Course-Brochure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38b6ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-xs shadow-md shadow-[#38b6ff]/20 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <span>📥 Data Science (PDF)</span>
                      </a>
                      <a
                        href="/nidads-data-analytics-brochure.pdf"
                        download="NIDADS-Data-Analytics-Course-Brochure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#2dd4bf] hover:from-[#115e59] hover:to-[#14b8a6] text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <span>📥 Data Analytics (PDF)</span>
                      </a>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      If download did not start automatically, tap the respective brochure button above.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#38b6ff] underline hover:text-white pt-2 cursor-pointer inline-block"
                  >
                    Submit another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] focus:ring-1 focus:ring-[#38b6ff] transition-all placeholder:text-gray-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul.sharma@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] focus:ring-1 focus:ring-[#38b6ff] transition-all placeholder:text-gray-500"
                    />
                  </div>

                  {/* Phone Number with India Code */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Mobile Number (WhatsApp) *</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center text-xs text-gray-400 font-medium pointer-events-none">
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        placeholder="9876543210"
                        className="w-full pl-12 sm:pl-14 pr-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] focus:ring-1 focus:ring-[#38b6ff] transition-all placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Select Program / Brochure */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Select Program / Brochure *</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] transition-colors cursor-pointer"
                    >
                      <option value="Data Science & AI Bootcamp">Data Science &amp; AI Bootcamp Brochure</option>
                      <option value="Data Analytics Bootcamp">Data Analytics Bootcamp Brochure</option>
                      <option value="Both (Data Science + Data Analytics)">Both (Data Science + Data Analytics) Brochures</option>
                    </select>
                  </div>

                  {/* Background / Current Status */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Background *</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] transition-colors cursor-pointer"
                    >
                      <option value="Working Professional - Tech">Working Professional (Tech)</option>
                      <option value="Working Professional - Non Tech">Working Professional (Non-Tech)</option>
                      <option value="College Student - Final Year">College Student (Final Year)</option>
                      <option value="College Student - 1st to 3rd Year">College Student (1st to 3rd Year)</option>
                      <option value="Fresher / Job Seeker">Fresher / Job Seeker</option>
                      <option value="Career Gap / Transition">Career Gap / Transition</option>
                      <option value="others">others</option>
                    </select>
                  </div>

                  {/* Error / Rate limit Alert */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2 animate-pulse">
                      <span className="shrink-0 text-sm font-bold">⚠️</span>
                      <span className="leading-relaxed">{errorMessage}</span>
                    </div>
                  )}

                  {/* CTA Submit Button with Animated Glow */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-extrabold text-sm sm:text-base button-attract-glow transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting details...
                      </span>
                    ) : (
                      <span>Get Free Counselling &amp; Syllabus</span>
                    )}
                  </button>

                  {/* Trust Footer */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-gray-400 pt-1">
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
            <h3 className="text-base font-bold text-white text-center pt-2">Why 25,000+ Students Trust NIDADS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <span className="text-xs text-gray-200 font-medium">
                  <strong>100% Placement Support</strong> until you land your dream job
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <span className="text-xs text-gray-200 font-medium">
                  <strong>24/7 1-on-1 Doubt Support</strong> via Live Chat &amp; Screen Share
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <span className="text-xs text-gray-200 font-medium">
                  <strong>20+ Industry Projects</strong> with real business datasets
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#07111e] border border-[#152d4e]">
                <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                <span className="text-xs text-gray-200 font-medium">
                  <strong>Govt &amp; Industry Recognized</strong> NIDADS verified certificate
                </span>
              </div>
            </div>

            {/* Mobile Stats 2x2 */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-xl font-extrabold text-[#38b6ff]">15,000+</div>
                <div className="text-[10px] text-gray-400 font-medium">Students Trained</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-xl font-extrabold text-emerald-400">98%</div>
                <div className="text-[10px] text-gray-400 font-medium">Success Rate</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-xl font-extrabold text-[#46d9ff]">500+</div>
                <div className="text-[10px] text-gray-400 font-medium">Hiring Partners</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07111e] border border-[#152d4e] text-center">
                <div className="text-xl font-extrabold text-amber-400">15+</div>
                <div className="text-[10px] text-gray-400 font-medium">Years Experience</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
