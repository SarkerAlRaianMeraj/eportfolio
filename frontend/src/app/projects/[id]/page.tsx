'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProject } from '@/lib/api';
import { Project } from '@/lib/types';

const categoryGradients: Record<string, string> = {
  web: 'from-blue-500 to-cyan-400',
  ml: 'from-purple-500 to-pink-400',
  research: 'from-green-500 to-emerald-400',
  iot: 'from-orange-500 to-amber-400',
  desktop: 'from-indigo-500 to-violet-400',
  other: 'from-gray-500 to-slate-400',
};

const categoryBadgeColors: Record<string, string> = {
  web: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50',
  ml: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-100 dark:border-purple-900/50',
  research: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 border border-green-100 dark:border-green-900/50',
  iot: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 border border-orange-100 dark:border-orange-900/50',
  desktop: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50',
  other: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      getProject(params.id as string)
        .then(setProject)
        .catch(() => setError('Project not found'))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 bg-white dark:bg-gray-900">
        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400 mb-4">{error || 'Project not found'}</p>
        <Link href="/#sarker-al-raian-meraj-projects" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen pt-20 pb-16 bg-white dark:bg-gray-900 relative overflow-hidden"
      initial="hidden"
      animate="show"
      variants={stagger}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={fadeUp}>
          <Link
            href="/#sarker-al-raian-meraj-projects"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            <span className="ml-1">Back to Projects</span>
          </Link>
        </motion.div>

        <motion.div className="mb-6" variants={fadeUp}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <span className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${categoryBadgeColors[project.category] || categoryBadgeColors.other}`}>
              {project.category}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </motion.div>

        {project.image_url && (
          <motion.div className="mb-8 rounded-2xl overflow-hidden glass gradient-border" variants={fadeUp}>
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        )}

        <motion.div className="prose prose-gray dark:prose-invert max-w-none" variants={fadeUp}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About this project</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </motion.div>

        <motion.div className="mt-8" variants={fadeUp}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
