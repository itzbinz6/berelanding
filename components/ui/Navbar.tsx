'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Platform', href: '/platform' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500 ease-in-out',
        scrolled || menuOpen
          ? 'bg-ink/80 backdrop-blur-lg border-b border-cream/10 shadow-sm py-4'
          : 'bg-transparent border-b border-transparent py-6'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">

        <Link href="/" className="font-display font-bold text-2xl tracking-tighter text-white">
          bẹrẹ
        </Link>

        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-terracotta transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/get-started"
          className={cn(
            'hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
            scrolled
              ? 'bg-terracotta text-cream hover:bg-terracotta/90'
              : 'bg-white text-ink hover:bg-cream'
          )}
        >
          Get Started
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300 origin-center', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300 origin-center', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </nav>

      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-500',
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <ul className="flex flex-col px-6 py-6 gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-base text-white/80 hover:text-terracotta transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 border-t border-cream/10">
            <Link
              href="/get-started"
              className="flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-lg bg-terracotta text-cream text-sm font-semibold hover:bg-terracotta/90 transition-all duration-200 shadow-lg"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
