'use client';

import React, { useState } from 'react';
import BrandLogo from '@/components/BrandLogo';

interface ProjectSpotlight {
  id: string;
  title: string;
  domain: string;
  student: {
    name: string;
    previousRole: string;
    placedAt: string;
    companyDomain: string;
    packageCTC: string;
    batch: string;
  };
  metrics: { label: string; value: string; change: string }[];
  description: string;
  tags: string[];
  builtInWeek: string;
  previewType: 'dashboard' | 'ai_chat' | 'risk_model' | 'demand_forecast';
}

const spotlightProjects: ProjectSpotlight[] = [
  {
    id: 'powerbi-churn',
    title: 'Executive Sales & Churn Intelligence Dashboard',
    domain: 'Business Intelligence & Analytics',
    student: {
      name: 'Rohit Sharma',
      previousRole: 'Operations Associate (₹3.2 LPA)',
      placedAt: 'Deloitte',
      companyDomain: 'deloitte.com',
      packageCTC: '₹11.5 LPA',
      batch: 'Batch of Oct 2025',
    },
    metrics: [
      { label: 'Annual Revenue Tracked', value: '₹4.82 Cr', change: '+18.4% YoY' },
      { label: 'Customer Churn Reduction', value: '21.4%', change: 'Identified Early' },
      { label: 'Data Points Modeled', value: '1.2M Rows', change: 'Real SQL DB' },
    ],
    description:
      'Built a complete end-to-end multi-page PowerBI executive dashboard tracking customer lifetime value (LTV), cohort retention heatmaps, and churn probability for a tier-1 D2C retail brand.',
    tags: ['PowerBI', 'DAX Formulas', 'Advanced SQL', 'Data Warehousing', 'ETL Pipelines'],
    builtInWeek: 'Week 8 Project',
    previewType: 'dashboard',
  },
  {
    id: 'rag-ai-agent',
    title: 'Enterprise Document Intelligence & RAG AI Agent',
    domain: 'Generative AI & LLMs',
    student: {
      name: 'Ananya Mishra',
      previousRole: 'B.Tech Fresher (Zero Prior AI)',
      placedAt: 'Fractal Analytics',
      companyDomain: 'fractal.ai',
      packageCTC: '₹14.0 LPA',
      batch: 'Batch of Dec 2025',
    },
    metrics: [
      { label: 'Search Latency', value: '240 ms', change: 'Sub-second' },
      { label: 'Retrieval Accuracy', value: '98.7%', change: 'Vector Hybrid' },
      { label: 'PDF Documents Indexed', value: '10,000+', change: 'Enterprise Docs' },
    ],
    description:
      'Production RAG pipeline using LangChain, ChromaDB vector database, and custom fine-tuned Llama 3 with citation ground-truth validation to query complex compliance and tax policies.',
    tags: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'FastAPI', 'Docker'],
    builtInWeek: 'Week 26 Project',
    previewType: 'ai_chat',
  },
  {
    id: 'xgboost-credit',
    title: 'Fintech Credit Risk & Loan Default XGBoost Engine',
    domain: 'Machine Learning & Predictive Modeling',
    student: {
      name: 'Vikram Patel',
      previousRole: 'Retail Banking Clerk (₹2.8 LPA)',
      placedAt: 'American Express',
      companyDomain: 'americanexpress.com',
      packageCTC: '₹16.0 LPA',
      batch: 'Batch of Aug 2025',
    },
    metrics: [
      { label: 'Model ROC-AUC Score', value: '0.942', change: 'Benchmark Beat' },
      { label: 'Default Detection Rate', value: '89.6%', change: 'High Recall' },
      { label: 'False Positive Reduction', value: '-34%', change: 'Optimized Cutoff' },
    ],
    description:
      'Engineered an enterprise credit approval classification pipeline handling class imbalance via SMOTE, hyperparameter tuning with Optuna, and explainability SHAP values for loan officers.',
    tags: ['Python', 'XGBoost', 'Scikit-Learn', 'SHAP Explainability', 'Streamlit'],
    builtInWeek: 'Week 14 Project',
    previewType: 'risk_model',
  },
  {
    id: 'demand-forecast',
    title: 'Omnichannel Retail Demand Forecasting Pipeline',
    domain: 'Data Science & Forecasting',
    student: {
      name: 'Sneha Kapoor',
      previousRole: 'Commerce Graduate / Fresher',
      placedAt: 'Amazon',
      companyDomain: 'amazon.com',
      packageCTC: '₹18.5 LPA',
      batch: 'Batch of Nov 2025',
    },
    metrics: [
      { label: 'Forecast Accuracy (MAPE)', value: '94.8%', change: 'Weekly Predict' },
      { label: 'Stockout Cost Saved', value: '₹1.15 Cr', change: 'Simulated' },
      { label: 'Automated Pipelines', value: '24/7 Run', change: 'Airflow / Cron' },
    ],
    description:
      'Time-series forecasting models using Prophet and seasonal ARIMA to optimize inventory across 4 regional warehouses, feeding directly into live procurement dashboards.',
    tags: ['Python', 'Prophet', 'PostgreSQL', 'Tableau', 'AWS S3'],
    builtInWeek: 'Week 20 Project',
    previewType: 'demand_forecast',
  },
];

export default function StudentProofOfWork() {
  const [activeTab, setActiveTab] = useState(spotlightProjects[0].id);

  const current = spotlightProjects.find((p) => p.id === activeTab) || spotlightProjects[0];

  return (
    <section id="proof-of-work" className="py-14 sm:py-20 bg-[#050b14] border-t border-[#152d4e] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#38b6ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Proof of Work &bull; Real Deliverables</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Don&apos;t Just Trust Logos.{' '}
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              See What Students Actually Build.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Hiring managers don&apos;t care about certificates—they inspect GitHub repos and live dashboards. Here is actual production work built by non-tech learners at NIDADS:
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-3 mb-8 -mx-4 px-4 sm:mx-0">
          {spotlightProjects.map((proj) => {
            const isActive = proj.id === activeTab;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveTab(proj.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#38b6ff] text-slate-950 border-[#38b6ff] shadow-lg shadow-[#38b6ff]/25 scale-102'
                    : 'bg-[#07111e] text-gray-300 border-[#152d4e] hover:border-[#38b6ff]/50 hover:text-white'
                }`}
              >
                <span>{proj.title.split('&')[0].trim()}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                    isActive ? 'bg-slate-900 text-white' : 'bg-white/10 text-[#38b6ff]'
                  }`}
                >
                  {proj.builtInWeek}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Project Showcase Card */}
        <div className="rounded-3xl bg-[#07111e] border border-[#1e3c66] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Student Story & Business Impact */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#152d4e]">
              <div className="space-y-4">
                {/* Domain & Week Pill */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#38b6ff]/10 text-[#38b6ff] border border-[#38b6ff]/25">
                    {current.domain}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {current.builtInWeek}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {current.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {current.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  {current.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#0a1626] border border-[#162c4d]">
                      <div className="text-base sm:text-lg font-extrabold text-white">{m.value}</div>
                      <div className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">{m.label}</div>
                      <div className="text-[9px] text-emerald-400 font-bold mt-1">{m.change}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Technologies Mastered &amp; Used:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {current.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#0d1d2f] text-slate-200 border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Student Placement Badge */}
              <div className="mt-6 pt-5 border-t border-[#152d4e] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#38b6ff] flex items-center justify-center text-white font-black text-base shadow-md">
                    {current.student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{current.student.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal">({current.student.batch})</span>
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Before: <span className="text-gray-300">{current.student.previousRole}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <BrandLogo name={current.student.placedAt} domain={current.student.companyDomain} size={14} />
                    <span className="text-xs font-black text-emerald-400">{current.student.packageCTC}</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Placed at {current.student.placedAt}</div>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Simulated Output Preview */}
            <div className="lg:col-span-7 bg-[#040810] p-5 sm:p-7 flex flex-col justify-center">
              
              {/* Window Title Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#152d4e]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-gray-400 font-mono ml-2">production-app.nidads.internal</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Live App &bull; GitHub Verified</span>
                </div>
              </div>

              {/* Dynamic Preview Screen based on project */}
              {current.previewType === 'dashboard' && (
                <div className="rounded-2xl bg-[#081220] border border-[#1a3558] p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-[#152d4e] pb-3">
                    <div>
                      <div className="text-xs font-bold text-gray-300">D2C Customer Retention &amp; LTV Dashboard</div>
                      <div className="text-[10px] text-gray-500">Live Power BI Service &bull; Auto-refreshes daily</div>
                    </div>
                    <div className="flex gap-1">
                      {['All Regions', 'FY 2025-26', 'Cohort M1-M12'].map((f, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-[#112239] text-[#38b6ff] px-2 py-0.5 rounded border border-[#1e3c66]">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Chart Bars */}
                  <div className="grid grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-xl bg-[#0d1f35] border border-[#1a385f]">
                      <div className="text-[10px] text-gray-400">Total Orders</div>
                      <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">84,290</div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-[#38b6ff] h-full rounded-full w-[78%]" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1f35] border border-[#1a385f]">
                      <div className="text-[10px] text-gray-400">Avg LTV</div>
                      <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">₹48,200</div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full w-[84%]" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1f35] border border-[#1a385f]">
                      <div className="text-[10px] text-gray-400">Repeat Purchase</div>
                      <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">63.8%</div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-[#46d9ff] h-full rounded-full w-[64%]" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1f35] border border-[#1a385f]">
                      <div className="text-[10px] text-gray-400">Risk Cohort</div>
                      <div className="text-sm sm:text-base font-extrabold text-rose-400 mt-0.5">8.2%</div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full w-[22%]" />
                      </div>
                    </div>
                  </div>

                  {/* Simulated Visual Cohort Heatmap */}
                  <div className="p-3.5 rounded-xl bg-[#0d1f35] border border-[#1a385f]">
                    <div className="flex items-center justify-between text-[11px] text-gray-300 font-bold mb-2">
                      <span>Monthly Cohort Retention Rate (%)</span>
                      <span className="text-[10px] text-[#38b6ff]">DAX: CALCULATE(DISTINCTCOUNT(...))</span>
                    </div>
                    <div className="space-y-1.5 text-[10px] font-mono">
                      {[
                        { cohort: 'Jan 2025', vals: [100, 84, 76, 71, 68, 64] },
                        { cohort: 'Feb 2025', vals: [100, 87, 81, 74, 72] },
                        { cohort: 'Mar 2025', vals: [100, 89, 83, 79] },
                        { cohort: 'Apr 2025', vals: [100, 91, 86] },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-16 text-gray-400 shrink-0">{row.cohort}</span>
                          <div className="flex-1 flex gap-1">
                            {row.vals.map((v, idx) => (
                              <div
                                key={idx}
                                style={{
                                  backgroundColor: `rgba(56, 182, 255, ${v / 110})`,
                                  color: v > 80 ? '#ffffff' : '#94a3b8',
                                }}
                                className="flex-1 py-1 text-center rounded font-bold"
                              >
                                {v}%
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {current.previewType === 'ai_chat' && (
                <div className="rounded-2xl bg-[#081220] border border-[#1a3558] p-4 sm:p-5 space-y-3 font-sans">
                  {/* User query */}
                  <div className="flex items-start gap-2.5 justify-end">
                    <div className="bg-[#0284c7] text-white p-3 rounded-2xl rounded-tr-none text-xs sm:text-sm max-w-md shadow-md">
                      What are the compliance guidelines for non-resident bank account opening under FEMA regulations?
                    </div>
                  </div>

                  {/* AI response with RAG source */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#38b6ff] text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-1">
                      AI
                    </div>
                    <div className="bg-[#0e2139] border border-[#1b3d68] text-slate-200 p-3.5 rounded-2xl rounded-tl-none text-xs sm:text-sm space-y-2 max-w-lg">
                      <p className="leading-relaxed">
                        Under FEMA (Foreign Exchange Management Act) Section 4(b), non-residents can open an <strong>NRE, NRO, or FCNR(B)</strong> account subject to:
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300">
                        <li>Valid foreign passport with overseas address proof.</li>
                        <li>PAN card or Form 60 declaration with tax residency cert.</li>
                        <li>Initial remittances must originate from abroad via banking channels.</li>
                      </ul>
                      <div className="pt-2 border-t border-[#173357] flex items-center justify-between text-[11px] text-[#38b6ff]">
                        <span className="font-mono">Sources: [RBI_Circular_Master_2025.pdf#p42]</span>
                        <span className="text-emerald-400 font-mono">Similarity: 0.964</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {current.previewType === 'risk_model' && (
                <div className="rounded-2xl bg-[#081220] border border-[#1a3558] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-300 border-b border-[#152d4e] pb-2">
                    <span className="font-bold">Inference Endpoint: POST /api/v1/predict-credit-risk</span>
                    <span className="text-emerald-400 font-mono">Status: 200 OK (38ms)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#0d1f35] border border-[#1a385f] space-y-1.5 font-mono text-[11px]">
                      <div className="text-gray-400 font-bold mb-1">Applicant Features Input:</div>
                      <div>cibil_score: <span className="text-[#38b6ff]">782</span></div>
                      <div>monthly_income: <span className="text-[#38b6ff]">₹1,25,000</span></div>
                      <div>debt_to_income: <span className="text-[#38b6ff]">0.21</span></div>
                      <div>employment_years: <span className="text-[#38b6ff]">4.5</span></div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5">
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-wide">
                        XGBoost Decision Output
                      </div>
                      <div className="text-2xl font-black text-emerald-400">APPROVED</div>
                      <div className="text-[11px] text-gray-300">
                        Default Risk Probability: <strong className="text-white">3.8%</strong>
                      </div>
                      <div className="text-[10px] text-emerald-300">
                        Recommendation: Fast-track credit limit up to ₹5,00,000.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {current.previewType === 'demand_forecast' && (
                <div className="rounded-2xl bg-[#081220] border border-[#1a3558] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-300 border-b border-[#152d4e] pb-2">
                    <span className="font-bold">Amazon Fulfillment Center: SKU-4819 (Electronics)</span>
                    <span className="text-[#38b6ff] font-mono">Prophet 52-Week Model</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span>Predicted Holiday Surge:</span>
                      <span className="text-emerald-400 font-bold">+184% Demand</span>
                    </div>
                    <div className="h-20 flex items-end gap-1.5 pt-2">
                      {[35, 42, 48, 45, 52, 60, 58, 65, 80, 95, 120, 110, 85, 70].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            style={{ height: `${(h / 120) * 100}%` }}
                            className={`w-full rounded-t ${
                              i >= 9 ? 'bg-amber-400' : 'bg-[#38b6ff]'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono pt-1">
                      <span>Week 1 (Baseline)</span>
                      <span className="text-amber-400 font-bold">Week 10 (Festival Peak)</span>
                      <span>Week 14 (Normalized)</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
