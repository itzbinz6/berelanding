'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const tallyWaitlistUrl = "https://tally.so/r/7R58GR";

const steps = [
  {
    number: '01',
    title: 'Join the waitlist',
    description: 'Takes 30 seconds. No credit card. Just your email and what stage you are at.',
  },
  {
    number: '02',
    title: 'Get early access',
    description: 'Waitlist members get first access to the platform when we launch — at early-access rates.',
  },
  {
    number: '03',
    title: 'Run your first assessment',
    description: 'Complete your bẹrẹ Risk Profile in under 10 minutes. Get a scored report across all 7 dimensions.',
  },
  {
    number: '04',
    title: 'Build with clarity',
    description: 'Know exactly what is holding your startup back. Fix it before investors tell you — or before it kills the business.',
  },
];

const included = [
  'Full bẹrẹ Risk Profile — free forever',
  'Idea Validator & Market Mapper',
  'Plain-English score report',
  'PDF download for investors',
  'No credit card required',
  'Cancel anytime',
];

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">

      {/* Hero */}
      <section className="relative bg-ink text-white pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-br from-terracotta/30 via-transparent to-transparent pointer-events-none"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white mb-8"
          >
            Get Started
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
          >
            Be among the{' '}
            <span className="text-terracotta">first founders.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-cream/70 max-w-2xl leading-relaxed font-light"
          >
            bẹrẹ is in early access. Join the waitlist and get first access to the platform built for where you actually operate.
          </motion.p>
        </div>
      </section>

      {/* Main CTA + What's Included */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Left — CTA */}
            <AnimatedSection>
              <div className="bg-ink rounded-2xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-terracotta to-terracotta/40" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                  Join the waitlist
                </h2>
                <p className="text-cream/60 text-sm leading-relaxed mb-8">
                  Takes 30 seconds. Free forever for the core tools.
                </p>
                <a
                  href={tallyWaitlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-terracotta text-cream font-semibold rounded-xl hover:bg-terracotta/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/25 text-sm mb-6"
                >
                  Join the Waitlist
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <ul className="flex flex-col gap-3">
                  {included.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-terracotta shrink-0" />
                      <span className="text-cream/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Right — How it works */}
            <AnimatedSection delay={0.1}>
              <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">How It Works</div>
              <div className="flex flex-col gap-8">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="text-terracotta font-display font-bold text-2xl shrink-0 w-8">{step.number}</div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink mb-1">{step.title}</h3>
                      <p className="text-ink/60 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Questions strip */}
      <section className="py-12 md:py-16 bg-ink/5 border-t border-ink/8">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Have questions?</h3>
              <p className="text-ink/60 text-sm">Reach out directly — we read every message.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:contactberehq@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-ink/10 text-ink font-semibold rounded-xl hover:border-terracotta/50 hover:shadow-md transition-all duration-300 text-sm"
              >
                contactberehq@gmail.com
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-cream font-semibold rounded-xl hover:bg-ink/90 transition-all duration-300 text-sm"
              >
                Learn About bẹrẹ
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
