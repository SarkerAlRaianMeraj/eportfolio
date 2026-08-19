'use client';

import { useEffect, useState } from 'react';
import { getResearch } from '@/lib/api';
import { Research as ResearchType } from '@/lib/types';

export default function Research() {
  const [research, setResearch] = useState<ResearchType[]>([]);

  useEffect(() => {
    getResearch().then(setResearch);
  }, []);

  if (research.length === 0) return null;

  return (
    <section id="research" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Research</h2>
        <div className="space-y-6">
          {research.map((item) => (
            <article
              key={item.id}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              {item.authors && item.authors.length > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {item.authors.join(', ')}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300 mb-3">
                {item.publication_venue && (
                  <span className="italic">{item.publication_venue}</span>
                )}
                {item.date && (
                  <span className="text-gray-400">•</span>
                )}
                {item.date && (
                  <span>{new Date(item.date).getFullYear()}</span>
                )}
              </div>
              {item.abstract && (
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                  {item.abstract}
                </p>
              )}
              <div className="flex gap-4">
                {item.doi_url && (
                  <a
                    href={item.doi_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    DOI →
                  </a>
                )}
                {item.pdf_url && (
                  <a
                    href={item.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    PDF →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
