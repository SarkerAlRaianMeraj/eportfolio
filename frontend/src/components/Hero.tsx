import { siteConfig } from '@/lib/config';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">{siteConfig.name}</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4">
          Computer Science Student & Full-Stack Developer
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Passionate about building scalable web applications and exploring the intersection of technology and healthcare through medical image processing research.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
