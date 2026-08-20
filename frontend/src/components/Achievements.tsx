'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '@/lib/types';
import { achievementsFallback } from '@/data/achievements';

const typeLabels: Record<string, string> = {
  award: 'Award',
  certification: 'Certification',
  deans_list: "Dean's List",
  competitive: 'Competitive Programming',
  competition: 'Competition',
  project: 'Project',
  other: 'Other',
};

const typeBadgeColors: Record<string, string> = {
  award: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300 border border-yellow-100 dark:border-yellow-900/50',
  certification: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 border border-green-100 dark:border-green-900/50',
  deans_list: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-100 dark:border-purple-900/50',
  competitive: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-100 dark:border-red-900/50',
  competition: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 border border-orange-100 dark:border-orange-900/50',
  project: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50',
  other: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariant = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(achievementsFallback as Achievement[]);

  useEffect(() => {
    fetch(`${API_URL}/achievements`, { signal: AbortSignal.timeout(3000) })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: Achievement[]) => { if (data.length > 0) setAchievements(data); })
      .catch(() => {});
  }, []);

  if (achievements.length === 0) return null;

  return (
    <section id="sarker-al-raian-meraj-achievements" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden section-divider">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-bold mb-12 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Achievements
        </motion.h2>
        <div className="relative">
          {/* Gradient timeline line */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 rounded-full"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            style={{ transformOrigin: 'top' }}
          />
          <motion.div
            className="space-y-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            {achievements.map((a) => (
              <motion.div key={a.id} className="relative pl-12" variants={itemVariant}>
                {/* Glowing timeline dot */}
                <motion.div
                  className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white dark:border-gray-900"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                />
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-glow-pulse -z-10 blur-sm" />

                <motion.div
                  className="p-5 glass gradient-border rounded-2xl"
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {a.title}
                    </h3>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${typeBadgeColors[a.type] || typeBadgeColors.other}`}>
                      {typeLabels[a.type] || a.type}
                    </span>
                  </div>
                  {a.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {a.description}
                    </p>
                  )}
                  {a.date && (
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
