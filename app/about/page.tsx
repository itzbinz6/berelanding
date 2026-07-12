'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const tallyWaitlistUrl = "https://tally.so/r/7R58GR";

const differentiators = [
  {
    number: '01',
    title: 'Built for Reality',
    body: 'Calibrated in the most demanding operating environments — currency volatility, infrastructure gaps, fragmented regulation. A tool that works honestly in Africa works everywhere.'
  },
  {
    number: '02',
    title: 'Full Founder Lifecycle',
    body: 'From the first idea to the first institutional round. Every module builds on the same data. Every insight compounds over time. One platform, the entire journey.'
  },
  {
    number: '03',
    title: 'Transparent by Design',
    body: 'Every score is fully traceable. Founders see the exact derivation of every number. No black boxes. No arbitrary scores. No guessing why investors said no.'
  },
];

const whoItIsFor = [
  {
    stage: 'Idea Stage',
    description: 'Pressure-test demand, estimate cost-to-first-revenue, and map a defensible TAM before committing capital.',
  },
  {
    stage: 'Early Execution',
    description: 'Operational health checks, compliance tracking, and tailored playbooks built for your industry and location.',
  },
  {
    stage: 'Pre-Fundraising',
    description: 'Stress-test your narrative against real data. Sequence investor outreach. Walk in knowing what they know.',
  },
  {
    stage: 'Scaling Operations',
    description: 'Competitor benchmarking and operational playbooks designed for growth-stage founders moving fast.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">

      {/* Hero */}
      <section className="relative bg-ink text-white pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.08, 0.18, 0.08] }}
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
            About bẹrẹ
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
          >
            bẹrẹ means{' '}
            <span className="text-terracotta">Start.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-cream/70 max-w-3xl leading-relaxed font-light"
          >
            A Yoruba word. Every company begins with a single decision — to begin.
            bẹrẹ is named for that moment and designed to travel with founders
            from first idea to institutional funding.
          </motion.p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">Our Vision</div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 max-w-4xl">
              A unified intelligence platform that guides founders from ideation through validation, execution, and investor readiness.
            </h2>
            <p className="text-lg md:text-xl text-ink/60 max-w-3xl leading-relaxed">
              The platform intelligence compounds across every phase. Data entered early powers evaluations and recommendations later. The longer a founder uses bẹrẹ, the sharper it gets.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-24 bg-ink text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">The Problem</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-16 max-w-2xl leading-tight">
              Two problems killing founders before they start.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-cream/10 p-8 md:p-10 h-full group hover:border-terracotta/30 transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-terracotta to-terracotta/40 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-terracotta font-display font-bold text-3xl mb-6">01</div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-4 text-white">The Lifecycle Void</h3>
                <p className="text-cream/60 leading-relaxed">
                  Founders stitch together Notion, Excel, Canva, and templates. These tools don't integrate or learn. bẹrẹ replaces the fragmented stack with a single environment that holds complete business intelligence and makes every module smarter over time.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-cream/10 p-8 md:p-10 h-full group hover:border-terracotta/30 transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-terracotta to-terracotta/40 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-terracotta font-display font-bold text-3xl mb-6">02</div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-4 text-white">Information Asymmetry</h3>
                <p className="text-cream/60 leading-relaxed">
                  Investors use proprietary scorecards founders never see. Founders walk into meetings blind, get rejected, and never know why. bẹrẹ democratizes the evaluation lens — giving founders access to the exact criteria investors use, before the meeting.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Who It Is For */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-14">
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">Who It Is For</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
              Any founder. Any stage. Anywhere.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whoItIsFor.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-ink/8 p-7 md:p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="w-8 h-1 bg-terracotta rounded-full mb-5 group-hover:w-12 transition-all duration-300" />
                  <h3 className="font-display text-lg md:text-xl font-bold mb-3 text-ink">{item.stage}</h3>
                  <p className="text-ink/60 text-sm md:text-base leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Africa First */}
      <section className="py-16 md:py-24 bg-ink/5">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">Why Africa First</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 max-w-3xl leading-tight">
              The hardest market to build in produces the most robust tools.
            </h2>
            <div className="space-y-5 text-lg text-ink/70 leading-relaxed max-w-3xl">
              <p>
                Africa is not a difficult market to build for. It is a complex one — 54 countries, dozens of regulatory frameworks, currency volatility, infrastructure gaps, and the fastest-growing digital population in the world.
              </p>
              <p>
                Most startup tools assume perfect infrastructure, stable currency, and predictable regulation. That bias excludes the majority of founders worldwide. bẹrẹ inverts that assumption.
              </p>
              <p className="text-ink font-semibold">
                Build for the hardest conditions and the product works everywhere. We are starting in Africa. We are building for the world.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What Makes bẹrẹ Different */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-14">
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">What Makes bẹrẹ Different</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
              Not another tool. An operating system.
            </h2>
          </AnimatedSection>

          <div className="flex flex-col gap-5">
            {differentiators.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative bg-white rounded-2xl border border-ink/8 p-7 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-terracotta to-terracotta/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="text-terracotta font-display font-bold text-3xl md:text-4xl shrink-0">{item.number}</div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-ink">{item.title}</h3>
                      <p className="text-ink/60 leading-relaxed text-sm md:text-base max-w-2xl">{item.body}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ink text-white text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to begin?
            </h2>
            <p className="text-xl text-cream/60 mb-10 leading-relaxed">
              Join the waitlist and be among the first founders to access the platform built for where you actually operate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={tallyWaitlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-cream font-semibold rounded-xl hover:bg-terracotta/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/25 text-sm"
              >
                Join the Waitlist
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/platform"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 border border-white/20 transition-all duration-300 text-sm"
              >
                Explore the Platform
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
