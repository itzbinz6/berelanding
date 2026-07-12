import type {Metadata} from 'next';
import { Syne, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'bẹrẹ | The Operating System for Ambition',
  description: 'An AI-powered startup intelligence platform that gives African founders the data, tools, and intelligence to build businesses that survive and scale.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-cream text-ink">
        <Navbar />
        {children}
      </body>
    </html>
  );
}