'use client';

import { useEffect, useState } from 'react';
import { getAchievements } from '@/lib/api';
import { Achievement } from '@/lib/types';

const typeLabels: Record<string, string> = {
  award: 'Award',
  certification: 'Certification',
  deans_list: "Dean's List",
  other: 'Other',
};

const typeColors: Record<string, string> = {
  award: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  certification: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  deans_list: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    getAchievements().then(setAchievements);
  }, []);

  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Achievements</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-8">
            {achievements.map((item) => (
              <div key={item.id} className="relative pl-12">
                <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800" />
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${typeColors[item.type] || typeColors.other}`}>
                      {typeLabels[item.type] || item.type}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {item.description}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
