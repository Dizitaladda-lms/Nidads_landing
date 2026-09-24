import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Job-Ready Tech Bootcamp | 100% Placement Support & 1:1 Mentorship',
  description: 'Master in-demand industry skills with live interactive sessions, hands-on capstone projects, MAANG mentors, and dedicated placement assistance.',
  keywords: ['Job Bootcamp', 'Data Science Course', 'Full Stack Bootcamp', 'Placement Support', 'Tech Upskilling'],
  openGraph: {
    title: 'Transform Your Tech Career with Intensive Job Bootcamp',
    description: 'Learn industry tech skills, get 1:1 mentorship from top tech giants, and land high-paying roles.',
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
