import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../types';
import UnderConstructionModal from './UnderConstructionModal';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Rotate through accent colors for placeholders
  const accentColors = ['bg-brutal-pink', 'bg-brutal-cyan', 'bg-brutal-yellow', 'bg-brutal-lime'];
  const bgColor = accentColors[index % accentColors.length];

  return (
    <motion.div
      className="bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white rounded-none overflow-hidden h-full flex flex-col shadow-brutal-md dark:shadow-brutal-md-light"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: 'linear' }}
    >
      {/* Project Image/Placeholder */}
      <div className={`h-48 ${bgColor} flex items-center justify-center border-b-4 border-brutal-black dark:border-brutal-white`}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-20 h-20 text-brutal-black dark:text-brutal-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-black mb-3 text-gradient">
          {project.name}
        </h3>

        <p className="text-brutal-black dark:text-brutal-white mb-4 flex-1 font-semibold">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4">
          <p className="text-sm text-brutal-gray-dark dark:text-brutal-gray-light mb-2 font-bold">Tech Stack:</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, techIndex) => {
              const badgeColor = accentColors[techIndex % accentColors.length];
              return (
                <span
                  key={tech}
                  className={`text-xs ${badgeColor} text-brutal-black px-3 py-1 rounded-none border-3 border-brutal-black dark:border-brutal-white font-bold`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t-3 border-brutal-black dark:border-brutal-white">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-brutal-black dark:text-brutal-white hover:text-brutal-cyan transition-brutal font-bold"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm font-bold">Repository</span>
          </motion.a>

          {project.liveUrl ? (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-brutal-cyan hover:text-brutal-pink transition-brutal font-bold"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-sm font-bold">Live Demo</span>
            </motion.a>
          ) : (
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 text-brutal-yellow hover:text-brutal-pink transition-brutal font-bold"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" />
              </svg>
              <span className="text-sm font-bold">Live Demo</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Under Construction Modal */}
      <UnderConstructionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName={project.name}
      />
    </motion.div>
  );
};

export default ProjectCard;
