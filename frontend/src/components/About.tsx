'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function About() {
  return (
    <section id="sarker-al-raian-meraj-about" className="py-20 bg-white dark:bg-gray-900 section-divider">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold mb-12 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I&apos;m a 3rd-year Computer Science student at AIUB and aspiring Full-Stack Developer with hands-on experience building responsive, user-friendly, and database-driven web applications. Skilled in React.js, Next.js, NestJS, and PostgreSQL.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Well-versed in SDLC, project management methodologies, and software quality assurance. Strong background in competitive programming with 1000+ problems solved on Codeforces, LightOJ, and other platforms.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Passionate about writing clean code, solving real-world problems, and contributing to collaborative development teams. Also interested in Machine Learning, NLP, and data-driven problem-solving.
            </p>
          </motion.div>
          <motion.div className="space-y-6" variants={fadeUp}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
            <div className="p-5 glass gradient-border rounded-xl">
              <p className="font-medium text-gray-900 dark:text-white">{siteConfig.education.degree}</p>
              <p className="text-gray-600 dark:text-gray-300">{siteConfig.education.university}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2023 - 2027</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">GPA: {siteConfig.education.gpa}</p>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Languages</h3>
            <div className="p-5 glass gradient-border rounded-xl">
              <p className="text-gray-600 dark:text-gray-300">Bangla: Native</p>
              <p className="text-gray-600 dark:text-gray-300">English: Professional Proficiency</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
