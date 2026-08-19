'use client';

import { useEffect, useState } from 'react';
import { getSkills } from '@/lib/api';
import { Skill } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  ml: 'Machine Learning',
  languages: 'Languages',
  tools: 'Tools',
};

const categoryColors: Record<string, string> = {
  frontend: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  backend: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  ml: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  languages: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  tools: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill.id}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[category] || categoryColors.tools}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
