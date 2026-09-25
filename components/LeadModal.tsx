'use client';

import React, { useState } from 'react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  sourceTag?: string;
  onSuccess?: (lead: any) => void;
}

export default function LeadModal({
  isOpen,
  onClose,
  title = 'Book Free 1-on-1 Career Counselling',
  subtitle = 'Get personalized curriculum & salary hike breakdown on WhatsApp',
  sourceTag = 'Modal Trigger',
  onSuccess,
}: LeadModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: 'Working Professional - Non Technical',
    mode: 'Online Live Batch',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

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

      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const utm_source = urlParams?.get('utm_source') || undefined;
      const utm_medium = urlParams?.get('utm_medium') || undefined;
      const utm_campaign = urlParams?.get('utm_campaign') || undefined;
      const utm_content = urlParams?.get('utm_content') || undefined;
      const utm_term = urlParams?.get('utm_term') || undefined;

      const payload = {
        ...formData,
        deviceId,
        source: sourceTag,
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
        source: sourceTag,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem('nidads_leads', JSON.stringify(existingLeads));

      setSubmitted(true);
      if (onSuccess) onSuccess(formData);

      // Trigger automatic brochure download
      try {
        const link = document.createElement('a');
        link.href = '/nidads-data-science-brochure.pdf';
        link.download = 'NIDADS-Data-Science-Course-Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (dlErr) {
        console.warn('Auto-download prevented:', dlErr);
      }
    } catch (err) {
      console.error('Lead error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#0a1626] to-[#07111e] border border-[#1e3c66] p-5 sm:p-7 shadow-2xl shadow-black text-white max-h-[92vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - larger mobile touch target */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-gray-300 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-3 sm:space-y-4">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-xl sm:text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-lg sm:text-xl font-bold">Brochure Download Started!</h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Your official Data Science course brochure has started downloading. Our Senior Career Advisor will also connect with you shortly on WhatsApp.
            </p>

            {/* Direct Brochure Download Action Button */}
            <div className="pt-1">
              <a
                href="/nidads-data-science-brochure.pdf"
                download="NIDADS-Data-Science-Course-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#38b6ff]/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>📥 Download Brochure (PDF) Again</span>
              </a>
              <p className="text-[10px] text-gray-400 mt-1">
                Tap above if the download didn&apos;t start automatically.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="mt-2 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-semibold text-xs cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-4 sm:mb-6 pr-6">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-[10px] sm:text-[11px] font-bold text-[#38b6ff] mb-1.5">
                Next Cohort Starting Soon
              </div>
              <h3 className="text-base sm:text-xl font-bold tracking-tight">{title}</h3>
              <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] transition-colors placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] transition-colors placeholder:text-gray-500"
                />
              </div>

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
                    className="w-full pl-12 sm:pl-14 pr-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] transition-colors placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Background *</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050b14] border border-[#162c4d] text-white text-base sm:text-sm focus:outline-none focus:border-[#38b6ff] cursor-pointer"
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

              {/* Rate Limit / Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2 animate-pulse">
                  <span className="shrink-0 text-sm font-bold">⚠️</span>
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#38b6ff]/25 transition-all cursor-pointer flex items-center justify-center active:scale-98"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Submit &amp; Download Syllabus</span>
                )}
              </button>

              <div className="text-center text-[10px] text-gray-400 pt-1">
                Your information is 100% confidential &amp; secure
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
