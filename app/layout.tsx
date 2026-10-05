import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Dancing_Script } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import { LanguageProvider } from '@/lib/language-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Bere | Startup Intelligence Tool for African Founders',
  description: 'We help African Founders make data-driven decisions with our startup intelligence tool.',
  metadataBase: new URL('https://techeet.online'),
  alternates: {
    canonical: 'https://www.bere.africa/',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://techeet.online/',
    title: 'Bere | Startup Intelligence Tool for African Founders',
    description: 'We help African Founders make data-driven decisions with our startup intelligence tool.',
    images: [
      {
        url: 'https://techeet.online/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Bere | Startup Intelligence Tool for African Founders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bere | Startup Intelligence Tool for African Founders',
    description: 'We help African Founders make data-driven decisions with our startup intelligence tool.',
    images: ['https://www.bere.africa/social-preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${dancingScript.variable}`}>
      <body
        suppressHydrationWarning
        className="font-sans antialiased text-stone-900 bg-stone-50 selection:bg-terracotta/20 selection:text-terracotta"
      >
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
