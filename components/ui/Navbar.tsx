'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';

const tallyWaitlistUrl = 'https://tally.so/r/7R58GR';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.why, href: '#problem' },
    { label: t.nav.framework, href: '#framework' },
    { label: t.nav.modules, href: '#modules' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500 ease-in-out',
        scrolled || menuOpen
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-sm py-4'
          : 'bg-transparent border-b border-transparent py-6'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">

        <a href="#hero" className="font-display font-bold text-2xl tracking-tighter text-white transition-colors duration-500">
          bẹrẹ
        </a>

        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90 transition-colors duration-500">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-terracotta transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all duration-300',
              scrolled
                ? 'border-stone-700 text-white/80 hover:text-white hover:border-stone-500'
                : 'border-white/30 text-white/90 hover:text-white hover:border-white/60'
            )}
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === 'en' ? 'FR' : 'EN'}
          </button>

          <a
            href={tallyWaitlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
              scrolled
                ? 'bg-terracotta text-white hover:bg-terracotta/90'
                : 'bg-white text-stone-900 hover:bg-stone-100'
            )}
          >
            {t.nav.cta}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <button
          type="button"
          className="md:hidden flex items-center gap-3"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              toggleLang();
            }}
            className="text-xs font-semibold uppercase tracking-wider text-white/80 border border-white/30 rounded-lg px-2 py-1.5"
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </span>
          <span className="flex flex-col gap-1.5 p-2 cursor-pointer">
            <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300 origin-center', menuOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300', menuOpen && 'opacity-0')} />
            <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300 origin-center', menuOpen && '-rotate-45 -translate-y-2')} />
          </span>
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
              <a
                href={link.href}
                className="font-sans text-base text-white/80 hover:text-terracotta transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-stone-800">
            <a
              href={tallyWaitlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-lg bg-terracotta text-white text-sm font-semibold hover:bg-terracotta/90 transition-all duration-200 shadow-lg"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.cta}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
