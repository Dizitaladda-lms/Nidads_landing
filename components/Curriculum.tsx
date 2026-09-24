'use client';

import React, { useState } from 'react';

interface CurriculumProps {
  onDownloadSyllabus: () => void;
}

export default function Curriculum({ onDownloadSyllabus }: CurriculumProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const modules = [
    {
      phase: 'Phase 1',
      title: 'Foundational Programming, Python & Advanced SQL',
      duration: 'Weeks 1 - 4',
      tools: ['Python 3.12', 'PostgreSQL', 'Git & GitHub', 'NumPy', 'Pandas'],
      topics: [
        'Python syntax, Data Structures, OOPs concepts & clean coding principles',
        'Relational Database Design, Complex SQL Joins, CTEs, Window Functions & Indexing',
        'Data Cleaning, Wrangling & Aggregations with Pandas & NumPy',
        'Version control with Git & GitHub industry best practices',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Exploratory Data Analysis, BI Dashboards & Statistics',
      duration: 'Weeks 5 - 8',
      tools: ['PowerBI', 'Tableau', 'Seaborn', 'Matplotlib', 'SciPy', 'Excel'],
      topics: [
        'Descriptive & Inferential Statistics, Hypothesis Testing, p-value, A/B Testing',
        'Data Visualization principles & storytelling with Matplotlib & Seaborn',
        'Building Executive Business Dashboards in PowerBI & Tableau',
        'Industry Capstone: E-commerce Customer Churn & Cohort Retention Analysis',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Machine Learning & Predictive Analytics',
      duration: 'Weeks 9 - 14',
      tools: ['Scikit-Learn', 'XGBoost', 'LightGBM', 'Flask', 'Docker'],
      topics: [
        'Supervised Learning: Linear/Logistic Regression, Decision Trees, Random Forests',
        'Advanced Ensemble Models: Gradient Boosting, XGBoost, CatBoost & Hyperparameter Tuning',
        'Unsupervised Learning: K-Means, Hierarchical Clustering, PCA Dimensionality Reduction',
        'End-to-End ML Pipeline, Model Evaluation Metrics & Containerization (Docker)',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Deep Learning, NLP & Computer Vision',
      duration: 'Weeks 15 - 20',
      tools: ['PyTorch', 'TensorFlow', 'HuggingFace', 'OpenCV'],
      topics: [
        'Neural Network Architecture, Backpropagation, Gradient Descent & Optimization',
        'Convolutional Neural Networks (CNNs) for Computer Vision & Image Classification',
        'Recurrent Neural Networks, LSTMs & Transformers for Natural Language Processing',
        'Transfer Learning using Pretrained PyTorch & HuggingFace Models',
      ],
    },
    {
      phase: 'Phase 5',
      title: 'Generative AI, Large Language Models (LLMs) & RAG Workflows',
      duration: 'Weeks 21 - 28',
      tools: ['LangChain', 'LlamaIndex', 'OpenAI API', 'ChromaDB', 'Pinecone', 'CrewAI'],
      topics: [
        'Prompt Engineering & Structured Outputs with modern LLMs',
        'Retrieval-Augmented Generation (RAG) architecture using Vector Databases (ChromaDB, Pinecone)',
        'Building Multi-Agent AI Workflows with LangChain, LangGraph & CrewAI',
        'Fine-tuning open-source LLMs (Llama 3 / Mistral) using LoRA / QLoRA',
      ],
    },
    {
      phase: 'Phase 6',
      title: 'Full Stack Cloud Deployment, MLOps & Capstone Projects',
      duration: 'Weeks 29 - 36',
      tools: ['AWS / GCP', 'FastAPI', 'MLflow', 'Streamlit', 'Next.js'],
      topics: [
        'Deploying scalable AI applications on AWS/GCP with FastAPI & Next.js frontend',
        'Continuous Integration & Deployment (CI/CD) pipelines with GitHub Actions',
        'Production Model Monitoring, Data Drift detection & Experiment Tracking with MLflow',
        'Final Industry Capstone Presentation evaluated by NIDADS Academic Board',
      ],
    },
  ];

  return (
    <section id="curriculum" className="py-12 sm:py-16 lg:py-20 bg-[#07111e] border-t border-[#152d4e] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-[#38b6ff]/10 border border-[#38b6ff]/30 text-xs font-semibold text-[#38b6ff] mb-2.5">
            Comprehensive Syllabus
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry-Aligned Curriculum <br />
            <span className="bg-gradient-to-r from-[#38b6ff] via-[#46d9ff] to-[#5478ff] bg-clip-text text-transparent">
              Designed with Hiring Managers
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            36 weeks of hands-on, project-based learning covering foundational coding to production AI models.
          </p>

          <button
            onClick={onDownloadSyllabus}
            className="mt-4 sm:mt-5 inline-block w-full xs:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#38b6ff]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Download Detailed Syllabus (PDF)
          </button>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {modules.map((mod, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0a1626] border-[#38b6ff]/60 shadow-xl shadow-[#38b6ff]/10'
                    : 'bg-[#050b14] border-[#152d4e] hover:border-[#38b6ff]/30'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-start sm:items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-[#38b6ff]/10 text-[#38b6ff] border border-[#38b6ff]/30">
                        {mod.phase}
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-400">
                        {mod.duration}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-white leading-snug">
                      {mod.title}
                    </h3>
                    
                    {/* Tool Badges preview */}
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap pt-0.5 sm:pt-1">
                      {mod.tools.map((t, i) => (
                        <span
                          key={i}
                          className="text-[9px] sm:text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300 px-1.5 sm:px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-[#38b6ff] font-bold text-base shrink-0 mt-0.5 sm:mt-0">
                    {isOpen ? '−' : '+'}
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-[#152d4e] space-y-2.5 sm:space-y-3 bg-[#050b14]/50">
                    <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                      Key Topics Covered:
                    </div>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {mod.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-gray-300">
                          <span className="text-[#38b6ff] font-bold text-sm shrink-0 mt-0.5">✓</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner - Stacks on mobile */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0369a1]/30 via-[#07111e] to-[#050b14] border border-[#38b6ff]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">Want the week-by-week syllabus PDF?</h4>
            <p className="text-xs text-gray-300 mt-0.5">Get projects, assignment schedules &amp; tools list delivered instantly on WhatsApp.</p>
          </div>
          <button
            onClick={onDownloadSyllabus}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#38b6ff]/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            Download Curriculum PDF
          </button>
        </div>

      </div>
    </section>
  );
}
