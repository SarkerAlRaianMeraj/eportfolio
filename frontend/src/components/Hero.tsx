'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden noise-overlay">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-400/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 dark:bg-purple-400/15 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-cyan-400/10 dark:bg-cyan-300/8 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-500/8 via-purple-500/8 to-cyan-500/8 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-cyan-500/5 rounded-full blur-3xl animate-gradient" />
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="mb-2">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 rounded-full border border-blue-100 dark:border-blue-900/50 mb-6">
            Open to opportunities
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          variants={fadeUp}
        >
          Hi, I&apos;m{' '}
          <span className="text-gradient-animated">
            {siteConfig.name}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4"
          variants={fadeUp}
        >
          Full-Stack Web Developer &amp; CS Student at AIUB
        </motion.p>

        <motion.p
          className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          variants={fadeUp}
        >
          Building scalable web applications with React.js, Next.js, NestJS &amp; PostgreSQL.
          Competitive programmer with 1000+ problems solved.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeUp}>
          <motion.a
            href="#sarker-al-raian-meraj-projects"
            className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium overflow-hidden btn-glow"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37, 99, 235, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
          <motion.a
            href="#sarker-al-raian-meraj-contact"
            className="px-8 py-3.5 glass gradient-border text-gray-700 dark:text-gray-300 rounded-xl font-medium"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(37, 99, 235, 0.15)' }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-4 h-4 animate-scroll-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
