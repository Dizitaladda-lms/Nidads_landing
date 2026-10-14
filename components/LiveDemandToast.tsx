'use client';

import React, { useState, useEffect } from 'react';

interface ToastEvent {
  name: string;
  location: string;
  action: string;
  detail: string;
  timeAgo: string;
  avatarBg: string;
}

const recentEvents: ToastEvent[] = [
  {
    name: 'Rahul S.',
    location: 'New Delhi',
    action: 'booked a 1-on-1 Career Roadmap session',
    detail: 'Targeting: Data Scientist Role (₹12-16 LPA)',
    timeAgo: '2 mins ago',
    avatarBg: 'bg-emerald-500',
  },
  {
    name: 'Ananya M.',
    location: 'Bengaluru',
    action: 'received a job offer @ ₹14.5 LPA',
    detail: 'Placed at Deloitte (Batch of Nov 2025)',
    timeAgo: '12 mins ago',
    avatarBg: 'bg-[#38b6ff]',
  },
  {
    name: 'Vikram T.',
    location: 'Pune',
    action: 'downloaded Week 1 Python & AI Starter Kit',
    detail: 'Transitioning from Mechanical to Data Analytics',
    timeAgo: 'Just now',
    avatarBg: 'bg-amber-500',
  },
  {
    name: 'Pooja K.',
    location: 'Gurgaon',
    action: 'reserved a seat for Upcoming Batch',
    detail: 'Online Interactive Batch (Only 4 seats left)',
    timeAgo: '5 mins ago',
    avatarBg: 'bg-purple-500',
  },
  {
    name: 'Sneha R.',
    location: 'Mumbai',
    action: 'cleared technical round @ Fractal Analytics',
    detail: 'Package: ₹13.8 LPA Data Analyst',
    timeAgo: '18 mins ago',
    avatarBg: 'bg-teal-500',
  },
  {
    name: 'Amit Verma',
    location: 'Noida',
    action: 'requested Offline Batch Visit (GK-II Delhi)',
    detail: 'Weekend Classroom Batch',
    timeAgo: '8 mins ago',
    avatarBg: 'bg-rose-500',
  },
];

export default function LiveDemandToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Initial delay before showing first toast
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (dismissed || isPaused) return;

    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % recentEvents.length);
        setVisible(true);
      }, 500);
    }, 8500);

    return () => clearInterval(interval);
  }, [dismissed, isPaused]);

  if (dismissed) return null;

  const current = recentEvents[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed z-40 transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } left-3 sm:left-6 bottom-20 sm:bottom-6 max-w-[340px] sm:max-w-sm w-[calc(100%-24px)]`}
      aria-live="polite"
    >
      <div className="relative rounded-2xl bg-[#07111e]/95 backdrop-blur-md border border-[#1e3c66] shadow-[0_12px_40px_rgba(0,0,0,0.55)] p-3 sm:p-3.5 flex items-start gap-3">
        {/* Animated green pulse badge */}
        <div className="relative shrink-0 mt-0.5">
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${current.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-md`}
          >
            {current.name.charAt(0)}
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#07111e]"></span>
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-white truncate">{current.name}</span>
            <span className="text-[11px] text-gray-400 font-medium">from {current.location}</span>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-200 font-medium leading-tight mt-0.5">
            {current.action}
          </p>

          <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-[#152d4e]/70">
            <span className="text-[10px] text-[#38b6ff] font-semibold truncate">
              {current.detail}
            </span>
            <span className="text-[10px] text-gray-400 shrink-0 font-mono">
              {current.timeAgo}
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs p-1 rounded-md transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
