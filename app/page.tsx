'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { StatCounter } from '@/components/ui/stat-counter';
import { AnimatedSection, AnimatedCard } from '@/components/ui/animated-section';
import { InteractiveCarousel } from '@/components/ui/interactive-carousel';
import { useLanguage } from '@/lib/language-context';

// Custom inline SVG icons to bypass deprecated lucide-react brand icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PROBLEM_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
];

const SOLUTION_IMAGES = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
];

const FRAMEWORK_IMAGES = [
  'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
];

const MODULE_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
];

export default function Home() {
  const heroImgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  // Configure your waitlist and social platform handles here!
  const tallyWaitlistUrl = "https://tally.so/r/7R58GR";
  const instagramUrl = "https://www.instagram.com/berehq";
  const xUrl = "https://x.com/berehq";
  const linkedinUrl = "https://www.linkedin.com/company/berehq/";

  const { scrollYProgress } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Safeguard: Force the local video to play automatically if the browser blocks it
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented initially:", err);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">

      {/* Section 1 - Hero with Background Video Loop */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-stone-950" ref={heroImgRef}>
        <motion.div style={{ y: heroImageY }} className="absolute inset-[-10%] w-[120%] h-[120%] z-0">
          <div className="relative w-full h-full">
            {/* Our optimized background video loop */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover scale-85 opacity-90 transition-opacity duration-1000"
            >
              <source src="https://ky8b2ydz75mqe00d.public.blob.vercel-storage.com/hero-loop.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Visual gradient overlays for contrast and text legibility */}
          <div className="absolute inset-0 bg-stone-950/70 sm:bg-stone-950/60 z-10 transition-colors duration-1000"></div>
          <motion.div
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-terracotta/20 via-transparent to-transparent z-10"
          ></motion.div>
        </motion.div>

        {/* Content container */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 md:px-8 text-center flex flex-col items-center mt-12 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 border border-white/20 shadow-xl"
          >
            <span>{t.hero.badge1}</span>
            <span className="opacity-50">·</span>
            <span>{t.hero.badge2}</span>
            <span className="opacity-50">·</span>
            <span>{t.hero.badge3}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8 text-white drop-shadow-lg"
          >
            {t.hero.h1Line1} <br />
            {t.hero.h1Line2} <br />
            {t.hero.h1Line3Pre}<span className="text-terracotta">{t.hero.h1Line3Accent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg md:text-2xl text-stone-200 mb-12 max-w-2xl leading-relaxed font-light drop-shadow"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 w-full pt-10 border-t border-white/20"
          >
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md"><StatCounter end={90} suffix="%" /></div>
              <div className="text-xs text-stone-300 uppercase tracking-wider font-semibold drop-shadow-sm">{t.hero.stat1Label}</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md"><StatCounter end={54} /></div>
              <div className="text-xs text-stone-300 uppercase tracking-wider font-semibold drop-shadow-sm">{t.hero.stat2Label}</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md"><StatCounter end={7} /></div>
              <div className="text-xs text-stone-300 uppercase tracking-wider font-semibold drop-shadow-sm">{t.hero.stat3Label}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - The Problem */}
      <section id="problem" className="py-24 md:py-32 bg-stone-950 text-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection>
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">{t.problem.eyebrow}</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {t.problem.heading}
            </h2>
            <p className="text-2xl md:text-3xl text-stone-400 font-light mb-20">
              {t.problem.subheading}
            </p>
          </AnimatedSection>

          <InteractiveCarousel>
            {t.problem.cards.map((card, i) => (
              <AnimatedSection
                key={card.num}
                delay={0.08 + i * 0.08}
                className="relative bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden group hover:border-stone-700 transition-colors flex flex-col h-full w-full"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={PROBLEM_IMAGES[i]}
                    fill
                    className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                    alt={card.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/20"></div>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-terracotta to-terracotta/60 opacity-50 group-hover:opacity-100 transition-opacity z-10"></div>
                <div className="relative z-10 p-8 flex flex-col h-full justify-end text-left">
                  <div className="text-terracotta font-display font-bold text-2xl mb-4">{card.num}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{card.title}</h3>
                  <p className="text-stone-400 leading-relaxed text-lg">
                    {card.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </InteractiveCarousel>
        </div>
      </section>

      {/* Section 3 - The Solution */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">{t.solution.eyebrow}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t.solution.heading}</h2>
            <p className="text-xl text-stone-600">
              {t.solution.subheading}
            </p>
          </AnimatedSection>

          <InteractiveCarousel>
            {t.solution.cards.map((card, i) => (
              <AnimatedCard
                key={card.tag}
                delay={0.08 + i * 0.08}
                className="relative bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full"
              >
                <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-stone-100">
                  <Image
                    src={SOLUTION_IMAGES[i]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={card.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative z-10 p-8 flex flex-col flex-grow bg-white text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-terracotta mb-4">{card.tag}</div>
                  <h3 className="text-2xl font-display font-bold mb-3">{card.title}</h3>
                  <p className="text-stone-600 leading-relaxed text-[15px]">
                    {card.desc}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </InteractiveCarousel>
        </div>
      </section>

      {/* Section 4 - The Meridian Framework */}
      <section id="framework" className="py-24 md:py-32 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-16">
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">{t.framework.eyebrow}</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t.framework.heading}</h2>
            <p className="text-lg text-stone-600 max-w-2xl">
              {t.framework.subheading}
            </p>
          </AnimatedSection>

          <InteractiveCarousel>
            {t.framework.dims.map((dim, i) => (
              <AnimatedCard key={dim.id} delay={i * 0.08} className="relative bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full">
                <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-stone-100">
                  <Image
                    src={FRAMEWORK_IMAGES[i]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={dim.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative z-10 p-8 flex flex-col flex-grow bg-white text-left">
                  <div className="text-terracotta font-display font-bold text-2xl mb-2 transition-transform duration-300 group-hover:translate-x-1">{dim.id}</div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-stone-900">{dim.name}</h3>
                  <p className="text-stone-600 text-[15px] leading-relaxed">{dim.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </InteractiveCarousel>
        </div>
      </section>

      {/* Section 5 - Built for Africa */}
      <section className="py-24 md:py-32 bg-stone-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full md:w-1/2 text-left">
              <AnimatedSection>
                <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">{t.africa.eyebrow}</div>
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight">
                  {t.africa.heading}
                </h2>
                <div className="space-y-6 text-stone-400 text-lg leading-relaxed mb-12">
                  <p>{t.africa.p1}</p>
                  <p>{t.africa.p2}</p>
                  <p className="text-white font-medium">{t.africa.p3}</p>
                </div>

                <div className="flex gap-12 border-t border-stone-800 pt-8">
                  <div>
                    <div className="font-display text-4xl font-bold text-white mb-2"><StatCounter end={54} /></div>
                    <div className="text-xs text-stone-500 uppercase tracking-wide">{t.africa.stat1Label}</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl font-bold text-white mb-2"><StatCounter end={10} /></div>
                    <div className="text-xs text-stone-500 uppercase tracking-wide">{t.africa.stat2Label}</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <AnimatedSection>
                <div className="relative aspect-square md:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
                   <Image
                     src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                     alt="African innovation and collaboration"
                     fill
                     className="object-cover"
                     referrerPolicy="no-referrer"
                   />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - The Intelligence Suite */}
      <section id="modules" className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-16">
            <div className="text-sm font-semibold tracking-widest text-terracotta mb-6 uppercase">{t.modules.eyebrow}</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t.modules.heading}</h2>
            <p className="text-lg text-stone-600 max-w-2xl">
              {t.modules.subheading}
            </p>
          </AnimatedSection>

          <InteractiveCarousel>
            {t.modules.mods.map((mod, i) => (
              <AnimatedCard
                key={mod.name + i}
                delay={i * 0.08}
                className="relative bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full"
              >
                <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-stone-100">
                  <Image
                    src={MODULE_IMAGES[i]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={mod.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 to-transparent group-hover:from-terracotta transition-colors duration-500 z-20"></div>
                <div className="relative z-10 p-8 flex flex-col flex-grow bg-white text-left">
                  <div className="mb-4 flex justify-between items-start">
                    {mod.live ? (
                      <span className="inline-flex items-center space-x-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span>{t.modules.liveBadge}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 bg-stone-100 text-stone-500 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                        <span>{t.modules.soonBadge}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">{mod.name}</h3>
                  <p className="text-stone-600 text-[15px] leading-relaxed">{mod.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </InteractiveCarousel>
        </div>
      </section>

      {/* Section 7 - Trust Strip */}
      <section className="py-8 bg-terracotta text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-center font-medium tracking-wide">
            <span>{t.trust.line1}</span>
            <span className="hidden md:block opacity-40">|</span>
            <span>{t.trust.line2}</span>
          </div>
        </div>
      </section>

      {/* Section 8 - Final CTA */}
      <section id="waitlist" className="py-24 md:py-32 bg-stone-100 text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t.cta.heading}</h2>
            <p className="text-xl text-stone-600 mb-10">
              {t.cta.subheading}
            </p>

            <div className="flex justify-center mb-6 max-w-md mx-auto">
              <a
                href={tallyWaitlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row gap-3 w-full p-2 bg-white border border-stone-200 rounded-xl hover:border-terracotta/50 shadow-md transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="flex-grow px-4 py-3 text-stone-400 text-sm flex items-center bg-transparent">
                  {t.cta.placeholder}
                </div>
                <span className="px-6 py-3 bg-terracotta text-white font-semibold rounded-lg text-sm transition-all duration-300 group-hover:bg-terracotta/90 flex items-center justify-center gap-2 shrink-0">
                  {t.cta.button}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>

            <p className="text-sm text-stone-500 flex justify-center items-center gap-2 md:gap-4 flex-wrap">
              <span>{t.cta.badge1}</span>
              <span className="hidden md:inline">·</span>
              <span>{t.cta.badge2}</span>
              <span className="hidden md:inline">·</span>
              <span>{t.cta.badge3}</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 9 - Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="font-display font-bold text-3xl tracking-tighter mb-6 md:mb-0">bẹrẹ</div>
            <div className="flex space-x-6">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <span className="sr-only">X</span>
                <XIcon className="w-5 h-5 mt-0.5" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              {t.footer.tagline1} <br className="md:hidden" />
              {t.footer.tagline2}
            </div>
            <div className="text-center md:text-right mb-8 md:mb-0">
              <a href="mailto:contactberehq@gmail.com" className="hover:text-stone-900 transition-colors">
                contactberehq@gmail.com
              </a>
            </div>
          </div>

          <div className="text-center text-xs text-stone-400 mt-8 pt-8 border-t border-stone-200">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
