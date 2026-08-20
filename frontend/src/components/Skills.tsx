'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/lib/types';
import { skillsFallback } from '@/data/skills';

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  ml: 'Machine Learning',
  languages: 'Languages',
  tools: 'Tools',
  os: 'Operating Systems',
  concepts: 'Concepts',
  professional: 'Professional Skills',
};

const categoryGradients: Record<string, string> = {
  frontend: 'from-blue-500 to-cyan-400',
  backend: 'from-green-500 to-emerald-400',
  ml: 'from-purple-500 to-pink-400',
  languages: 'from-yellow-500 to-orange-400',
  tools: 'from-gray-500 to-slate-400',
  os: 'from-teal-500 to-cyan-400',
  concepts: 'from-rose-500 to-pink-400',
  professional: 'from-amber-500 to-yellow-400',
};

const categoryBadgeColors: Record<string, string> = {
  frontend: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50',
  backend: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 border border-green-100 dark:border-green-900/50',
  ml: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-100 dark:border-purple-900/50',
  languages: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300 border border-yellow-100 dark:border-yellow-900/50',
  tools: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
  os: 'bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 border border-teal-100 dark:border-teal-900/50',
  concepts: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-100 dark:border-rose-900/50',
  professional: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-100 dark:border-amber-900/50',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(skillsFallback as Skill[]);

  useEffect(() => {
    fetch(`${API_URL}/skills`, { signal: AbortSignal.timeout(3000) })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: Skill[]) => { if (data.length > 0) setSkills(data); })
      .catch(() => {});
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="sarker-al-raian-meraj-skills" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-bold mb-12 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              className="group relative p-6 glass gradient-border rounded-2xl"
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Gradient accent line at top */}
              <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${categoryGradients[category] || categoryGradients.tools} rounded-full opacity-60`} />

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, i) => (
                  <motion.span
                    key={skill.id}
                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-default transition-shadow duration-300 hover:shadow-md ${categoryBadgeColors[category] || categoryBadgeColors.tools}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
