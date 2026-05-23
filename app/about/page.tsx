'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import ExperienceMap from '@/components/about/ExperienceMap';
import Skills from '@/components/about/Skills';

export default function About() {
  return (
    <div className="space-y-16">
      {/* Professional Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="text-center md:text-left"
      >
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
        </h1>
        <h2 className="mb-6 text-2xl font-semibold text-foreground-muted dark:text-foreground-subtle md:text-3xl">
          {personalInfo.title}
        </h2>
        <motion.p
          className="mx-auto max-w-3xl text-lg leading-relaxed text-foreground-primary dark:text-foreground-inverse md:mx-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {personalInfo.summary}
        </motion.p>
      </motion.section>

      {/* Experience Map */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <h2 className="mb-8 text-center text-3xl font-bold">
          My <span className="text-gradient">Journey</span>
        </h2>
        <ExperienceMap />
      </motion.section>

      {/* <img src="https://ghchart.rshah.org/dhananjayandayalan" alt="GitHub Contribution Graph" /> */}

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <h2 className="mb-8 text-center text-3xl font-bold">
          <span className="text-gradient">Skills</span> & Technologies
        </h2>
        <Skills />
      </motion.section>
    </div>
  );
}
