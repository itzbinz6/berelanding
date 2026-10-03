'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedSection, AnimatedCard } from '@/components/ui/animated-section';

const tallyWaitlistUrl = "https://tally.so/r/7R58GR";

const phases = [
  {
    number: '01',
    name: 'Ideation',
    action: 'Validate problem-market fit',
    description: 'Pressure-test viability, map target audiences, estimate cost-to-first-revenue, and calculate a defensible TAM before committing capital. Converts wishful thinking into rigorous, testable hypotheses.',
  },
  {
    number: '02',
    name: 'Execution',
    action: 'Build product and operations',
    description: 'Operational playbooks tailored to industry and location, compliance tracking, and data-driven scaling strategies that prioritize what is fragile versus what is healthy.',
  },
  {
    number: '03',
    name: 'Evaluation',
    action: 'Assess performance and risks',
    description: 'Run a seven-category risk assessment. Receive a scored, prioritized map of vulnerabilities and tactical prescriptions to improve each dimension before any investor sees them.',
  },
  {
    number: '04',
    name: 'Funding',
    action: 'Prepare for investor readiness',
    description: 'Reframe risk through institutional evaluation, stress-test pitch narrative against operational data, and receive a sequenced investor outreach and data-room checklist.',
  },
];

const dimensions = [
  {
    id: '1',
    name: 'Financial Risk',
    description: 'Evaluates runway, revenue, and growth trajectory. Critical sub-metrics include Runway and Revenue Growth Rate.',
  },
  {
    id: '2',
    name: 'Market Risk',
    description: 'Assesses market size, growth, and defensibility. High penalties for small TAM paired with high competition.',
  },
  {
    id: '3',
    name: 'Team Risk',
    description: 'Scores founder experience, skill diversity, and co-founder dynamics across character, competence, and chemistry.',
  },
  {
    id: '4',
    name: 'Regulatory Risk',
    description: 'Manages legal and compliance hurdles, crucial in fragmented markets. Country Risk is auto-populated, not self-reported.',
  },
  {
    id: '5',
    name: 'Product & Tech Risk',
    description: 'Focuses on product functionality and suitability for local infrastructure, including mobile-first architecture in emerging markets.',
  },
  {
    id: '6',
    name: 'Operational Risk',
    description: 'Measures day-to-day business health, including customer concentration and process documentation maturity.',
  },
  {
    id: '7',
    name: 'Distribution Risk',
    description: 'Examines efficient customer acquisition and growth, contrasting channel mix effectiveness and CAC:LTV ratios.',
  },
];

const modules = [
  {
    name: 'Idea Validator & Market Mapper',
    description: 'Validate concepts, market fit, and costs before significant time or capital commitment. Know if the idea is worth building before you build it.',
    live: true,
  },
  {
    name: 'The bẹrẹ Risk Profile',
    description: 'The core assessment across 7 Meridian dimensions. Foundational for all other modules and every internal diagnostic on the platform.',
    live: true,
  },
  {
    name: 'Execution & Compliance Playbook',
    description: 'Dynamic operational roadmap tailored to your industry and location, with integrated regulatory guidance that updates as you scale.',
    live: false,
  },
  {
    name: 'Investment Readiness Score',
    description: 'Reframes Risk Profile data through an investor lens, assessing fundability without requiring new questions or additional inputs.',
    live: false,
  },
  {
    name: 'Competitor Benchmarking',
    description: 'Compares your risk profile against anonymized peers in your sector and provides ecosystem context for every major metric.',
    live: false,
  },
  {
    name: 'Pitch Deck Alignment',
    description: 'Verifies pitch claims against operational data, identifying investor pushback points and surfacing strengthening suggestions before you walk in.',
    live: false,
  },
];

export default function PlatformPage() {
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
            The Platform
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
          >
            The operating system{' '}
            <span className="text-terracotta">for ambition.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-cream/70 max-w-3xl leading-relaxed font-light"
          >
            Six purpose-built modules. One data foundation. Intelligence that compounds with every input a founder makes.
          </motion.p>
        </div>
      </section>

      {/* The Four Phases */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-14">
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">The Core Journey</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl mb-4">
              Four phases. One compounding platform.
            </h2>
            <p className="text-lg text-ink/60 max-w-2xl">
              Data entered in earlier phases powers evaluations and recommendations in later phases. The platform gets smarter the longer you use it.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {phases.map((phase, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative bg-white rounded-2xl border border-ink/8 p-7 md:p-8 h-full shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-terracotta to-terracotta/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-terracotta font-display font-bold text-3xl mb-2">{phase.number}</div>
                  <h3 className="font-display text-xl font-bold mb-1 text-ink">{phase.name}</h3>
                  <div className="text-xs font-semibold uppercase tracking-wider text-terracotta/70 mb-4">{phase.action}</div>
                  <p className="text-ink/60 text-sm leading-relaxed">{phase.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* The Meridian Framework */}
      <section className="py-16 md:py-24 bg-ink text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-14">
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">The Meridian Framework</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl mb-4">
              Seven dimensions of startup intelligence.
            </h2>
            <p className="text-lg text-cream/60 max-w-2xl">
              Traditional VC frameworks cover five domains. The bẹrẹ Meridian Framework goes further — calibrated specifically for African market conditions and applicable globally.
            </p>
          </AnimatedSection>

          <div className="flex flex-col gap-4">
            {dimensions.map((dim, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-cream/10 p-6 md:p-8 group hover:border-terracotta/30 transition-colors duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-terracotta to-terracotta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                    <div className="text-terracotta font-mono font-bold text-xl shrink-0 w-6">{dim.id}</div>
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-bold mb-2 text-white">{dim.name}</h3>
                      <p className="text-cream/50 text-sm leading-relaxed">{dim.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* The Six Modules */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-14">
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">The Intelligence Suite</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl mb-4">
              Everything a founder needs. One platform.
            </h2>
            <p className="text-lg text-ink/60 max-w-2xl">
              The Risk Profile is just the beginning. Six purpose-built modules, all drawing from the same data foundation.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod, i) => (
              <AnimatedCard key={i} delay={i * 0.08}>
                <div className="relative bg-white rounded-2xl border border-ink/8 p-7 h-full shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-terracotta to-terracotta/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="mb-4">
                    {mod.live ? (
                      <span className="inline-flex items-center gap-1.5 bg-success/10 text-success px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                        Available Now
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-ink/5 text-ink/40 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3 text-ink">{mod.name}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed flex-grow">{mod.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-12 bg-terracotta text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Free to start. Powerful to scale.</h3>
              <p className="text-white/70 text-sm md:text-base">Risk Profile and Idea Validator are free. Premium unlocks the full suite.</p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-terracotta font-semibold rounded-xl hover:bg-cream transition-all duration-300 text-sm shrink-0 hover:-translate-y-0.5 hover:shadow-lg"
            >
              See Pricing
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ink text-white text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Start your assessment.
            </h2>
            <p className="text-xl text-cream/60 mb-10 leading-relaxed">
              Join the waitlist and be among the first founders to access the full bẹrẹ Intelligence Suite.
            </p>
            <a
              href={tallyWaitlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-cream font-semibold rounded-xl hover:bg-terracotta/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/25 text-sm"
            >
              Join the Waitlist
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
