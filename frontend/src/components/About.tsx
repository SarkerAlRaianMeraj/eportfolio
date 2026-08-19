import { siteConfig } from '@/lib/config';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              I&apos;m a Computer Science student with a passion for building impactful software solutions. 
              My interests lie in full-stack web development and exploring how technology can be applied 
              to solve real-world problems, particularly in healthcare.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Currently, I&apos;m involved in medical image processing research, where I apply machine learning 
              techniques to assist in diagnostic workflows. I enjoy working with modern technologies like 
              NestJS, TypeScript, and PostgreSQL to build scalable and maintainable applications.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium text-gray-900 dark:text-white">{siteConfig.education.degree}</p>
              <p className="text-gray-600 dark:text-gray-300">{siteConfig.education.university}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expected Graduation: {siteConfig.education.graduation}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">GPA: {siteConfig.education.gpa}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
