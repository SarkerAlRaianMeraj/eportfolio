import { Project } from '@/lib/types';

export const projectsFallback: Project[] = [

  {
    id: '2',
    title: 'Pharmacy Management System',
    description: 'Desktop system for managing medicine inventory, sales, and billing with efficient data handling using structured OOP modules and intuitive user interfaces for smooth workflow.',
    tech_stack: ['Java', 'OOP'],
    repo_url: 'https://github.com/SarkerAlRaianMeraj/-E-Pharamcy.git',
    category: 'desktop',
    featured: true,
    created_at: '2024-09-01T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'E-Portfolio Website',
    description: 'Personal portfolio website built with Next.js and NestJS, featuring project showcases, blog, admin dashboard, and dark mode. Deployed on Vercel with PostgreSQL backend.',
    tech_stack: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    repo_url: 'https://github.com/SarkerAlRaianMeraj/eportfolio',
    live_url: 'https://frontend-ten-zeta-41.vercel.app',
    category: 'web',
    featured: true,
    created_at: '2025-01-01T00:00:00.000Z',
  },
];
