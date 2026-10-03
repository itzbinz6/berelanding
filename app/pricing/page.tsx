'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { AnimatedSection, AnimatedCard } from '@/components/ui/animated-section';

const tallyWaitlistUrl = "https://tally.so/r/7R58GR";

const tiers = [
  {
    name: 'Free',
    tagline: 'Start with everything you need.',
    price: '$0',
    period: 'forever',
    description: 'Full access to the core tools. No credit card. No time limit. Built to drive adoption and give every founder a real advantage from day one.',
    features: [
      'Idea Validator & Market Mapper',
      'Full bẹrẹ Risk Profile assessment',
      'Scored report across all 7 dimensions',
      'Basic Competitor Benchmarking',
      'Plain-English score explanations',
      'PDF report download',
    ],
    cta: 'Join the Waitlist',
    ctaHref: tallyWaitlistUrl,
    external: true,
    highlight: false,
  },
  {
    name: 'Founder Premium',
    tagline: 'Everything you need to raise.',
    price: 'Coming Soon',
    period: '',
    description: 'Unlock the full intelligence suite. Built for founders actively preparing to scale or raise — with the tools investors wish you already had.',
    features: [
      'Everything in Free',
      'Execution & Compliance Playbook',
      'Investment Readiness Score',
      'Pitch Deck Alignment module',
      'Full Investor Targeting database',
      'Priority support',
    ],
    cta: 'Join the Waitlist',
    ctaHref: tallyWaitlistUrl,
    external: true,
    highlight: true,
  },
  {
    name: 'Enterprise',
    tagline: 'For VCs, accelerators, and universities.',
    price: 'Custom',
    period: '',
    description: 'Use bẹrẹ for inbound screening, cohort management, or as a curriculum tool. Standardized data. Structured evaluation frameworks. Institutional-grade output.',
    features: [
      'Everything in Founder Premium',
      'Portfolio-level dashboard',
      'Cohort management tools',
      'Anonymized benchmark data access',
      'Custom integrations',
      'Dedicated account support',
    ],
    cta: 'Contact Us',
    ctaHref: 'mailto:contactberehq@gmail.com',
    external: false,
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">

      {/* Hero */}
      <section className="relative bg-ink text-white pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-br from-terracotta/30 via-transparent to-transparent pointer-events-none"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white mb-8"
          >
            Pricing
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
          >
            Free to start.{' '}
            <span className="text-terracotta">Powerful to scale.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-cream/70 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Built on a freemium model designed to give every founder a real advantage — and drive the proprietary data asset that makes the platform increasingly valuable over time.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {tiers.map((tier, i) => (
              <AnimatedCard key={i} delay={i * 0.1}>
                <div className={`relative rounded-2xl border p-7 md:p-8 h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  tier.highlight
                    ? 'bg-ink text-white border-terracotta shadow-lg shadow-ink/20'
                    : 'bg-white text-ink border-ink/8 shadow-sm'
                }`}>
                  {tier.highlight && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-terracotta to-terracotta/50" />
                  )}
                  {tier.highlight && (
                    <div className="inline-flex items-center gap-1.5 bg-terracotta/20 text-terracotta px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-5 w-fit">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`font-display text-xl font-bold mb-1 ${tier.highlight ? 'text-white' : 'text-ink'}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-5 ${tier.highlight ? 'text-cream/60' : 'text-ink/50'}`}>
                      {tier.tagline}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className={`font-display text-4xl font-bold ${tier.highlight ? 'text-white' : 'text-ink'}`}>
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className={`text-sm ${tier.highlight ? 'text-cream/50' : 'text-ink/40'}`}>
                          /{tier.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed mb-8 ${tier.highlight ? 'text-cream/60' : 'text-ink/60'}`}>
                    {tier.description}
                  </p>

                  <ul className="flex flex-col gap-3 mb-8 flex-grow">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlight ? 'text-terracotta' : 'text-success'}`} />
                        <span className={`text-sm ${tier.highlight ? 'text-cream/80' : 'text-ink/70'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={tier.ctaHref}
                    target={tier.external ? '_blank' : undefined}
                    rel={tier.external ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                      tier.highlight
                        ? 'bg-terracotta text-cream hover:bg-terracotta/90 hover:shadow-lg hover:shadow-terracotta/25'
                        : 'bg-ink/5 text-ink hover:bg-ink/10 border border-ink/10'
                    }`}
                  >
                    {tier.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="py-16 md:py-20 bg-ink/5 border-t border-ink/8">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Pricing not locked in yet?</h2>
            <p className="text-ink/60 text-base leading-relaxed mb-8">
              bẹrẹ is in early access. Exact pricing for premium tiers will be confirmed closer to launch. Join the waitlist to be notified first — and to lock in early-access rates when they go live.
            </p>
            <a
              href={tallyWaitlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-terracotta text-cream font-semibold rounded-xl hover:bg-terracotta/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/25 text-sm"
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
