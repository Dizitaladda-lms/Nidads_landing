'use client';

import React, { useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import AutoCarousel from '@/components/AutoCarousel';

const toolMeta: Record<string, { domain: string; icon?: string }> = {
  'Python 3.12': {
    domain: 'python.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
  PostgreSQL: {
    domain: 'postgresql.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  },
  'Git & GitHub': {
    domain: 'github.com',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  },
  NumPy: {
    domain: 'numpy.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
  },
  Pandas: {
    domain: 'pandas.pydata.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
  },
  PowerBI: {
    domain: 'powerbi.microsoft.com',
    icon: 'https://api.iconify.design/logos:microsoft-power-bi.svg',
  },
  Tableau: {
    domain: 'tableau.com',
    icon: 'https://api.iconify.design/logos:tableau-icon.svg',
  },
  Seaborn: {
    domain: 'seaborn.pydata.org',
    icon: 'https://api.iconify.design/logos:seaborn-icon.svg',
  },
  Matplotlib: {
    domain: 'matplotlib.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',
  },
  SciPy: {
    domain: 'scipy.org',
    icon: 'https://api.iconify.design/simple-icons:scipy.svg?color=%230C55A5',
  },
  Excel: {
    domain: 'microsoft.com',
    icon: 'https://api.iconify.design/vscode-icons:file-type-excel.svg',
  },
  'Scikit-Learn': {
    domain: 'scikit-learn.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
  },
  XGBoost: {
    domain: 'xgboost.ai',
    icon: 'https://api.iconify.design/simple-icons:xgboost.svg?color=%230284c7',
  },
  LightGBM: {
    domain: 'lightgbm.readthedocs.io',
    icon: 'https://api.iconify.design/simple-icons:lightgbm.svg?color=%230284c7',
  },
  Flask: {
    domain: 'palletsprojects.com',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
  },
  Docker: {
    domain: 'docker.com',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  },
  PyTorch: {
    domain: 'pytorch.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
  },
  TensorFlow: {
    domain: 'tensorflow.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
  },
  HuggingFace: {
    domain: 'huggingface.co',
    icon: 'https://api.iconify.design/fluent-emoji:hugging-face.svg',
  },
  OpenCV: {
    domain: 'opencv.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
  },
  LangChain: {
    domain: 'langchain.com',
    icon: 'https://api.iconify.design/simple-icons:langchain.svg?color=%231C3C3C',
  },
  LlamaIndex: {
    domain: 'llamaindex.ai',
  },
  'OpenAI API': {
    domain: 'openai.com',
    icon: 'https://api.iconify.design/simple-icons:openai.svg?color=%2310A37F',
  },
  ChromaDB: {
    domain: 'trychroma.com',
  },
  Pinecone: {
    domain: 'pinecone.io',
  },
  CrewAI: {
    domain: 'crewai.com',
  },
  'AWS / GCP': {
    domain: 'aws.amazon.com',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  FastAPI: {
    domain: 'fastapi.tiangolo.com',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  },
  MLflow: {
    domain: 'mlflow.org',
    icon: 'https://api.iconify.design/simple-icons:mlflow.svg?color=%230194E2',
  },
  Streamlit: {
    domain: 'streamlit.io',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg',
  },
  'Next.js': {
    domain: 'nextjs.org',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
};

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
      title: 'Building & Deploying Custom LLMs & AI Agents for Business Automation',
      duration: 'Weeks 21 - 28',
      tools: ['LangChain', 'LlamaIndex', 'OpenAI API', 'ChromaDB', 'Pinecone', 'CrewAI'],
      topics: [
        'Production Multi-Agent Systems & Autonomous Workflows (CrewAI & LangGraph)',
        'Enterprise Retrieval-Augmented Generation (RAG) with Vector Databases (ChromaDB, Pinecone)',
        'Fine-Tuning Open Source LLMs (Llama 3, Mistral) with LoRA / QLoRA for Domain Datasets',
        'Structured Output Function Calling, Prompt Engineering & Hallucination Guardrails',
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

          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onDownloadSyllabus}
              className="inline-flex items-center justify-center gap-2 w-full xs:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#38b6ff] to-[#46d9ff] hover:from-[#0369a1] hover:to-[#38b6ff] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#38b6ff]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>📥 Data Science Syllabus (PDF)</span>
            </button>
            <button
              onClick={onDownloadSyllabus}
              className="inline-flex items-center justify-center gap-2 w-full xs:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#2dd4bf] hover:from-[#115e59] hover:to-[#14b8a6] text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>📥 Data Analytics Syllabus (PDF)</span>
            </button>
          </div>
        </div>

        {/* Modules Accordion */}
        <AutoCarousel
          desktopClassName="hidden md:block md:space-y-4"
          mobileClassName="md:hidden"
          intervalMs={8000}
        >
          {modules.map((mod, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#38b6ff] shadow-lg shadow-[#38b6ff]/10'
                    : 'bg-white border-blue-100 hover:border-[#38b6ff]/50 shadow-sm'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-start sm:items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284c7] border border-sky-200">
                        {mod.phase}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-500">
                        {mod.duration}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                      {mod.title}
                    </h3>
                    
                    {/* Tool Badges preview (shown when collapsed so open state doesn't duplicate tools twice) */}
                    {!isOpen && (
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-1">
                        {mod.tools.map((t, i) => {
                          const meta = toolMeta[t];
                          return (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-800 px-2.5 py-1 rounded-lg shadow-2xs"
                            >
                              {meta && (
                                <BrandLogo
                                  name={t}
                                  domain={meta.domain}
                                  iconUrl={meta.icon}
                                  size={16}
                                />
                              )}
                              <span>{t}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284c7] font-bold text-lg shrink-0 mt-0.5 sm:mt-0">
                    {isOpen ? '−' : '+'}
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-blue-100 bg-sky-50/40">
                    <div className="rounded-xl border border-sky-200/80 bg-white p-3.5 sm:p-4 shadow-xs">
                      <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-[#0284c7]">
                        Tools Covered
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {mod.tools.map((tool, toolIndex) => {
                          const meta = toolMeta[tool];
                          return (
                            <span
                              key={toolIndex}
                              className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50/80 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 shadow-2xs"
                            >
                              {meta && (
                                <BrandLogo
                                  name={tool}
                                  domain={meta.domain}
                                  iconUrl={meta.icon}
                                  size={20}
                                />
                              )}
                              <span>{tool}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </AutoCarousel>

        {/* Week 1 Free Test-Drive Micro-Conversion Banner */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d223d] via-[#091b32] to-[#0d223d] border-2 border-[#38b6ff]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
              <span>⚡ ZERO RISK TEST-DRIVE</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Not Sure If You Can Code? Try Week 1 for Free.
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get the complete <strong>Week 1 Python &amp; AI Interactive Starter Kit</strong> + video lesson sent directly to your WhatsApp. Test your aptitude before committing a single rupee.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onDownloadSyllabus}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Get Week 1 Starter Kit on WhatsApp →
            </button>
            <button
              onClick={onDownloadSyllabus}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#07111e] hover:bg-[#0a1626] border border-[#162c4d] text-gray-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Download Full PDF
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
