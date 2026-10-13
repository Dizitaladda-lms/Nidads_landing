'use client';

import React, { useEffect, useState } from 'react';
import { captureAttribution } from '@/lib/attribution';

type ActionMode = 'WHATSAPP' | 'PHONE_CALL';

export default function WhatsAppButton() {
  const phoneNumber = '919205436796'; // Official NIDADS Admissions WhatsApp
  const defaultMessage = encodeURIComponent(
    'Hi NIDADS, I saw your Data Science & AI Bootcamp Ad and want to know more about the course fees, curriculum, and placement assistance.'
  );
  const whatsappHref = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
  const callHref = 'tel:+919205436796';

  const [promptOpen, setPromptOpen] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>('WHATSAPP');
  const [targetUrl, setTargetUrl] = useState<string>(whatsappHref);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const getSavedUserLead = (): { fullName?: string; phone?: string; email?: string; course?: string } | null => {
    try {
      const existing = JSON.parse(localStorage.getItem('nidads_leads') || '[]');
      if (Array.isArray(existing) && existing.length > 0 && existing[0]?.phone) {
        const clean = String(existing[0].phone).replace(/\D/g, '').slice(-10);
        if (clean.length === 10) {
          return {
            fullName: existing[0].fullName || '',
            phone: clean,
            email: existing[0].email || '',
            course: existing[0].course || 'Data Science & AI Bootcamp',
          };
        }
      }
    } catch {
      // ignore storage errors
    }
    return null;
  };

  const sendDirectActionLeadToCrm = async (
    mode: ActionMode,
    phone10: string,
    nameInput?: string,
    emailInput?: string,
    courseInput?: string
  ) => {
    try {
      let deviceId = '';
      try {
        deviceId = localStorage.getItem('nidads_device_id') || '';
        if (!deviceId) {
          deviceId = 'dev_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
          localStorage.setItem('nidads_device_id', deviceId);
        }
      } catch {}

      const attr = captureAttribution();
      const sourceLabel = mode === 'WHATSAPP' ? 'WhatsApp Button Click' : 'Phone Call Button Click';
      const displayName =
        nameInput && nameInput.trim()
          ? nameInput.trim()
          : mode === 'WHATSAPP'
          ? `WhatsApp Lead (${phone10})`
          : `Phone Call Lead (${phone10})`;

      const payload = {
        fullName: displayName,
        phone: phone10,
        email: emailInput || '',
        course: courseInput || 'Data Science & AI Bootcamp',
        experience: mode === 'WHATSAPP' ? 'Clicked WhatsApp Button' : 'Clicked Phone Call Button',
        mode: mode === 'WHATSAPP' ? 'WhatsApp Inquiry' : 'Direct Phone Call',
        source: sourceLabel,
        leadType: mode,
        deviceId,
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

      // Save user phone in localStorage so subsequent clicks don't even need to ask again
      try {
        const existingLeads = JSON.parse(localStorage.getItem('nidads_leads') || '[]');
        existingLeads.unshift({
          fullName: displayName,
          phone: phone10,
          email: emailInput || '',
          course: courseInput || 'Data Science & AI Bootcamp',
          source: sourceLabel,
          timestamp: new Date().toLocaleString(),
        });
        localStorage.setItem('nidads_leads', JSON.stringify(existingLeads.slice(0, 20)));
      } catch {}

      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (err) {
      console.warn('Direct action CRM tracking error:', err);
    }
  };

  // Global listener: intercepts any tel: or wa.me link click across the entire landing page
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const isTel = href.startsWith('tel:');
      const isWhatsApp = href.includes('wa.me') || href.includes('api.whatsapp.com');

      if (!isTel && !isWhatsApp) return;

      const mode: ActionMode = isWhatsApp ? 'WHATSAPP' : 'PHONE_CALL';
      const saved = getSavedUserLead();

      // If user has already provided their 10-digit number earlier on the page,
      // send the WhatsApp/Call lead immediately to CRM in the background and let the link open!
      if (saved && saved.phone) {
        sendDirectActionLeadToCrm(mode, saved.phone, saved.fullName, saved.email, saved.course);
        return;
      }

      // Otherwise, open the quick 1-step number capture modal first
      e.preventDefault();
      e.stopPropagation();
      setActionMode(mode);
      setTargetUrl(href);
      setPromptOpen(true);
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, []);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = userPhone.replace(/\D/g, '').slice(0, 10);
    if (cleanPhone.length !== 10) return;

    setSubmitting(true);
    await sendDirectActionLeadToCrm(actionMode, cleanPhone, userName);
    setSubmitting(false);
    setPromptOpen(false);

    if (actionMode === 'WHATSAPP') {
      window.open(targetUrl || whatsappHref, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = targetUrl || callHref;
    }
  };

  return (
    <>
      <div className="fixed bottom-[4.5rem] md:bottom-6 right-3.5 sm:right-5 z-40 flex flex-col items-center gap-2.5 sm:gap-3">
        {/* Phone Call Button (Upar Phone Logo) */}
        <a
          href={callHref}
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#0284c7] via-[#009bd7] to-[#38b6ff] hover:from-[#0369a1] hover:to-[#0284c7] text-white shadow-xl shadow-sky-600/35 transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-sky-200/50 cursor-pointer"
          aria-label="Call NIDADS at +91 92054 36796"
          title="Call NIDADS (+91 92054 36796)"
        >
          <svg
            viewBox="0 0 24 24"
            width="21"
            height="21"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
          </svg>
        </a>

        {/* WhatsApp Circular Button (Sirf WhatsApp Logo) */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-600/35 transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-emerald-300/40 cursor-pointer"
          aria-label="Chat with NIDADS on WhatsApp"
          title="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2a9.87 9.87 0 0 0-8.46 14.96L2.2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.08a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.09.81.83-3.01-.2-.31a8.15 8.15 0 1 1 6.91 3.82Zm4.48-6.1c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.8.98-.15.16-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.38.11-.5.11-.1.25-.27.37-.41.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.12.16 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.11-.23-.17-.48-.29Z" />
          </svg>
        </a>
      </div>

      {/* Quick Connect Modal for WhatsApp / Phone Call Lead Capture */}
      {promptOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setPromptOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xl text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPromptOpen(false)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-center mb-4 pr-4">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 ${
                  actionMode === 'WHATSAPP'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-sky-100 text-[#0284c7] border border-sky-200'
                }`}
              >
                <span>{actionMode === 'WHATSAPP' ? '📲 Instant WhatsApp' : '📞 Instant Call Connect'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {actionMode === 'WHATSAPP' ? 'Connect on WhatsApp' : 'Call NIDADS Admissions'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {actionMode === 'WHATSAPP'
                  ? 'Enter your mobile number to start WhatsApp chat with our counsellor.'
                  : 'Enter your mobile number to connect your call immediately.'}
              </p>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Your Mobile Number *
                </label>
                <div className="flex items-center">
                  <div className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl px-3 py-2.5 text-slate-700 text-sm font-bold select-none">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    autoFocus
                    pattern="[0-9]{10}"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-r-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#0284c7] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Your Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#0284c7] font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || userPhone.length !== 10}
                className={`w-full py-3 px-5 rounded-xl text-white font-extrabold text-sm sm:text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 ${
                  actionMode === 'WHATSAPP'
                    ? 'bg-[#25D366] hover:bg-[#20bd5a] shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-[#0284c7] via-[#009bd7] to-[#38b6ff] hover:from-[#0369a1] hover:to-[#0284c7] shadow-sky-500/25'
                }`}
              >
                {submitting ? (
                  <span>Connecting...</span>
                ) : actionMode === 'WHATSAPP' ? (
                  <span>Continue to WhatsApp &rarr;</span>
                ) : (
                  <span>Call Now (+91 92054 36796)</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

