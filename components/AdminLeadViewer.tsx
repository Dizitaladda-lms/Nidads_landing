'use client';

import React, { useState, useEffect } from 'react';

interface LeadRecord {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  source: string;
  date: string;
}

export default function AdminLeadViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [leads, setLeads] = useState<LeadRecord[]>([]);

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('nidads_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const downloadCSV = () => {
    if (leads.length === 0) {
      alert('No leads recorded yet!');
      return;
    }

    const headers = ['Full Name', 'Email', 'Phone', 'Status/Experience', 'Source', 'Date'];
    const rows = leads.map((l) => [
      `"${l.fullName || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.experience || ''}"`,
      `"${l.source || ''}"`,
      `"${l.date || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nidads_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearLeads = () => {
    if (confirm('Are you sure you want to clear all stored leads?')) {
      localStorage.removeItem('nidads_leads');
      setLeads([]);
    }
  };

  return (
    <>
      {/* Discreet Trigger Button in footer */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] text-gray-500 hover:text-[#38b6ff] cursor-pointer transition-colors"
        title="Admin: View Captured Leads"
      >
        Admin Leads ({leads.length > 0 ? leads.length : '0'})
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0a1626] border border-[#1e3c66] p-4 sm:p-6 shadow-2xl text-white max-h-[88vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#152d4e] gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Captured Campaign Leads ({leads.length})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadCSV}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Download CSV
                </button>
                <button
                  onClick={clearLeads}
                  className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-[11px] sm:text-xs transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-xs transition-colors cursor-pointer font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Table Area with horizontal scroll on phones */}
            <div className="overflow-y-auto overflow-x-auto flex-1 mt-3 sm:mt-4">
              {leads.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-xs sm:text-sm">
                  No leads captured yet. Submit the form on the landing page to see live test data!
                </div>
              ) : (
                <div className="min-w-[500px]">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-[#07111e] text-gray-400 font-semibold sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Phone</th>
                        <th className="py-2.5 px-3">Email</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#152d4e]/40">
                      {leads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-3 font-semibold text-white">{lead.fullName}</td>
                          <td className="py-2.5 px-3 text-[#38b6ff] font-mono font-semibold">{lead.phone}</td>
                          <td className="py-2.5 px-3 text-gray-300">{lead.email}</td>
                          <td className="py-2.5 px-3 text-gray-400 text-[11px]">{lead.experience}</td>
                          <td className="py-2.5 px-3 text-gray-500 text-[10px]">{lead.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#152d4e] text-[10px] sm:text-[11px] text-gray-400 flex items-center justify-between">
              <span>Leads stored locally &amp; at <code>/api/lead</code>.</span>
              <button
                onClick={loadLeads}
                className="hover:text-white transition-colors"
              >
                Refresh List
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
