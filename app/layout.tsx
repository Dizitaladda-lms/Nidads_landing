import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ads.nidads.com'),
  title: 'Data Science & AI Bootcamp | NIDADS (100% Placement Support)',
  description: 'Join India’s premier Data Science, Machine Learning & Data Analytics Bootcamp at NIDADS. Live interactive sessions, hands-on capstone projects, and dedicated placement support.',
  keywords: ['Data Science Course', 'Data Analytics Bootcamp', 'NIDADS', 'Machine Learning', 'Artificial Intelligence', 'Job Bootcamp Delhi', '100% Placement Support'],
  alternates: {
    canonical: 'https://ads.nidads.com',
  },
  openGraph: {
    title: 'Master Data Science & AI with 100% Placement Support | NIDADS',
    description: 'Learn Python, SQL, Machine Learning, Power BI & Generative AI through live production projects with NIDADS.',
    url: 'https://ads.nidads.com',
    siteName: 'NIDADS Data Science & AI Bootcamp',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#0a0a0f] text-slate-100 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
