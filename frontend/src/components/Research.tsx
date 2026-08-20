'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Research as ResearchType } from '@/lib/types';
import { researchFallback } from '@/data/research';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariant = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function Research() {
  const [research, setResearch] = useState<ResearchType[]>(researchFallback as ResearchType[]);

  useEffect(() => {
    fetch(`${API_URL}/research`, { signal: AbortSignal.timeout(3000) })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: ResearchType[]) => { if (data.length > 0) setResearch(data); })
      .catch(() => {});
  }, []);

  if (research.length === 0) return null;

  return (
    <section id="sarker-al-raian-meraj-research" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-bold mb-12 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Research
        </motion.h2>
        <motion.div
          className="space-y-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {research.map((r) => (
            <motion.article
              key={r.id}
              className="group relative p-6 glass rounded-2xl overflow-hidden"
              variants={itemVariant}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
            >
              {/* Gradient left border */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 rounded-full" />

              <div className="pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {r.title}
                </h3>
                {r.authors && r.authors.length > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {r.authors.join(', ')}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {r.publication_venue && (
                    <span className="italic">{r.publication_venue}</span>
                  )}
                  {r.date && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{new Date(r.date).getFullYear()}</span>
                    </>
                  )}
                </div>
                {r.abstract && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                    {r.abstract}
                  </p>
                )}
                <div className="flex gap-4">
                  {r.doi_url && (
                    <a
                      href={r.doi_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      DOI →
                    </a>
                  )}
                  {r.pdf_url && (
                    <a
                      href={r.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      PDF →
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
