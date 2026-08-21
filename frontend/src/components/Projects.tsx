'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import { projectsFallback } from '@/data/projects';

const categoryGradients: Record<string, string> = {
  web: 'from-blue-500 to-cyan-400',
  desktop: 'from-indigo-500 to-violet-400',
  ml: 'from-purple-500 to-pink-400',
  research: 'from-green-500 to-emerald-400',
  iot: 'from-orange-500 to-amber-400',
  other: 'from-gray-500 to-slate-400',
};

const categoryBadgeColors: Record<string, string> = {
  web: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50',
  desktop: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50',
  ml: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-100 dark:border-purple-900/50',
  research: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 border border-green-100 dark:border-green-900/50',
  iot: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 border border-orange-100 dark:border-orange-900/50',
  other: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(projectsFallback as Project[]);

  useEffect(() => {
    fetch(`${API_URL}/projects`, { signal: AbortSignal.timeout(10000) })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: Project[]) => { if (data.length > 0) setProjects(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="sarker-al-raian-meraj-projects" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden section-divider">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-bold mb-12 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Link href={`/projects/${project.id}`} className="block h-full">
                <motion.div
                  className="group h-full p-6 glass gradient-border rounded-2xl"
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  {/* Gradient accent line */}
                  <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${categoryGradients[project.category] || categoryGradients.other} rounded-full opacity-60`} />

                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gradient transition-all">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${categoryBadgeColors[project.category] || categoryBadgeColors.other}`}>
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.repo_url && (
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition-colors">
                        GitHub →
                      </span>
                    )}
                    {project.live_url && (
                      <span className="text-sm text-blue-600 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors">
                        Live Demo →
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
