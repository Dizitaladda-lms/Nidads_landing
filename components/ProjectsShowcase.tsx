'use client';

import React from 'react';

export default function ProjectsShowcase() {
  const projects = [
    {
      title: 'Credit Risk & Loan Default Prediction System',
      desc: 'Predict borrower default probability using financial metrics, credit history, and explanation models for risk officers.',
      category: 'Fintech & ML',
      tags: ['Python', 'XGBoost', 'Scikit-Learn', 'FastAPI', 'Streamlit'],
      impact: 'Reduced default risk estimation error by 23%',
    },
    {
      title: 'Healthcare Patient Demographics & Cost Optimization',
      desc: 'Analyze 500,000+ clinical records to detect ICU readmission patterns, medical billing anomalies, and treatment outcome forecasts.',
      category: 'Healthcare Analytics',
      tags: ['PostgreSQL', 'PowerBI', 'Scikit-Learn', 'Pandas'],
      impact: 'Built executive BI dashboard for hospital directors',
    },
    {
      title: 'Enterprise Document Intelligence & Search Platform',
      desc: 'Production-ready semantic search platform indexing thousands of financial PDFs with vector search and citations.',
      category: 'AI & NLP',
      tags: ['Python', 'ChromaDB', 'Transformers', 'Docker', 'Next.js'],
      impact: 'Sub-second search across 10,000+ documentation pages',
    },
    {
      title: 'E-Commerce Real-time Recommendation Engine',
      desc: 'Collaborative filtering & deep neural models serving personalized product recommendations to active shoppers.',
      category: 'E-Commerce & Deep Learning',
      tags: ['PyTorch', 'Redis', 'AWS', 'Docker'],
      impact: 'Simulated 14% lift in user cart conversion',
    },
    {
      title: 'Omnichannel Retail Sales & Churn Analytics',
      desc: 'Complex SQL data warehouse design with window functions, cohort retention matrix, and automated anomaly alerts.',
      category: 'Data Engineering',
      tags: ['PostgreSQL', 'dbt', 'SQL', 'Tableau'],
      impact: 'Automated 15+ daily executive business KPIs',
    },
    {
      title: 'Automated Code Reviewer & Security Auditing System',
      desc: 'CI/CD automated pipeline analyzing code commits for memory leaks, SQL injections, and compliance violations with suggested fixes.',
      category: 'DevOps & Automation',
      tags: ['Python', 'GitHub API', 'FastAPI', 'Docker'],
      impact: 'Reduced human code review turnaround by 40%',
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 bg-[#050b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff] mb-3">
            Hands-on Portfolio
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Build Real-World Industry Projects <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              That Get You Hired
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3">
            At NIDADS, students build production systems on GitHub with real corporate datasets that hiring managers look for.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#07111e] border border-[#152d4e] p-6 flex flex-col justify-between hover:border-[#38b6ff]/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38b6ff]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#38b6ff]/10 text-[#38b6ff] border border-[#38b6ff]/20">
                    {proj.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 hover:text-[#38b6ff] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  {proj.desc}
                </p>
              </div>

              <div>
                <div className="p-2.5 rounded-lg bg-[#38b6ff]/10 border border-[#38b6ff]/20 text-[#38b6ff] text-xs font-semibold mb-4">
                  {proj.impact}
                </div>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#152d4e]">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/[0.04] text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
