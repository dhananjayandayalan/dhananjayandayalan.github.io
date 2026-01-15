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
        transition={{ duration: 0.1, ease: 'linear' }}
        className="text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-brutal-gray-dark dark:text-brutal-gray-light font-bold mb-6">
          {personalInfo.title}
        </h2>
        <motion.p
          className="text-lg text-brutal-black dark:text-brutal-white leading-relaxed max-w-3xl mx-auto md:mx-0 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        >
          {personalInfo.summary}
        </motion.p>
      </motion.section>

      {/* Experience Map */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: 'linear' }}
      >
        <h2 className="text-3xl font-black mb-8 text-center">
          My <span className="text-gradient">Journey</span>
        </h2>
        <ExperienceMap />
        <div className='text-center text-xs my-3 space-y-1'>
          <p className='text-brutal-gray-dark dark:text-brutal-gray-light font-bold'>
            *Try <span className='text-gradient font-black'>Clicking</span> (or) <span className='text-gradient font-black'>Hovering</span> on both Company Name and Location Pin
          </p>
          <p className='text-brutal-gray-dark dark:text-brutal-gray-light font-bold hidden md:block'>
            *<span className='text-gradient font-black'>Drag</span> to pan • <span className='text-gradient font-black'>Scroll</span> to zoom • Use <span className='text-gradient font-black'>controls</span> on the right
          </p>
        </div>
      </motion.section>

      {/* <img src="https://ghchart.rshah.org/dhananjayandayalan" alt="GitHub Contribution Graph" /> */}

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: 'linear' }}
      >
        <h2 className="text-3xl font-black mb-8 text-center">
          <span className="text-gradient">Skills</span> & Technologies
        </h2>
        <Skills />
      </motion.section>
    </div>
  );
}
