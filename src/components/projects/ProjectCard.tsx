import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../types';
import UnderConstructionModal from './UnderConstructionModal';
import { useTheme } from '@/context/ThemeContext';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const placeholderStyles = [
  'bg-slate-100 dark:bg-slate-800',
  'bg-blue-50 dark:bg-slate-800',
  'bg-teal-50 dark:bg-slate-800',
  'bg-slate-200 dark:bg-slate-800',
];

const badgeStyles = [
  'dark:bg-blue-500/15 dark:text-blue-200',
  'dark:bg-teal-500/15 dark:text-teal-200',
  'dark:bg-slate-700/60 dark:text-slate-200',
  'dark:bg-indigo-500/15 dark:text-indigo-200',
];

const lightBadgeTextColors = ['#1D4ED8', '#0F766E', '#334155', '#4338CA'];
const lightBadgeBackgroundColors = ['#EFF6FF', '#F0FDFA', '#F8FAFC', '#EEF2FF'];

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();
  const placeholderClass = placeholderStyles[index % placeholderStyles.length];
  const fallbackSurfaceStyle = {
    backgroundColor: theme === 'light' ? '#E2E8F0' : '#1E293B',
  };
  const fallbackIconSurfaceStyle = {
    backgroundColor: theme === 'light' ? '#F8FAFC' : '#0F172A',
    color: theme === 'light' ? '#475569' : '#CBD5E1',
  };

  return (
    <motion.div
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border-primary)] bg-[color:var(--bg-secondary)] shadow-soft-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div
        className={`flex h-48 items-center justify-center border-b border-[color:var(--border-primary)] ${
          project.imageUrl ? placeholderClass : ''
        }`}
        style={project.imageUrl ? undefined : fallbackSurfaceStyle}
      >
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[color:var(--border-primary)]"
            style={fallbackIconSurfaceStyle}
          >
            <svg
              className="h-14 w-14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 text-2xl font-semibold text-gradient">
          {project.name}
        </h3>

        <p className="mb-4 flex-1 text-foreground-muted dark:text-foreground-subtle">
          {project.description}
        </p>

        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-foreground-muted dark:text-foreground-subtle">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, techIndex) => {
              const badgeClass = badgeStyles[techIndex % badgeStyles.length];
              return (
                <span
                  key={tech}
                  className={`rounded-full border border-[color:var(--border-primary)] px-3 py-1 text-xs font-medium ${badgeClass}`}
                  style={
                    theme === 'light'
                      ? {
                          color: lightBadgeTextColors[techIndex % lightBadgeTextColors.length],
                          backgroundColor: lightBadgeBackgroundColors[techIndex % lightBadgeBackgroundColors.length],
                        }
                      : undefined
                  }
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex gap-5 border-t border-[color:var(--border-primary)] pt-4">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-foreground-muted transition-smooth hover:text-accent-primary dark:text-foreground-subtle"
            whileTap={{ scale: 0.98 }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm font-medium">Repository</span>
          </motion.a>

          {project.liveUrl ? (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-accent-primary transition-smooth hover:text-accent-secondary"
              whileTap={{ scale: 0.98 }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-sm font-medium">Live Demo</span>
            </motion.a>
          ) : (
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 text-amber-600 transition-smooth hover:text-accent-primary"
              whileTap={{ scale: 0.98 }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" />
              </svg>
              <span className="text-sm font-medium">Live Demo</span>
            </motion.button>
          )}
        </div>
      </div>

      <UnderConstructionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName={project.name}
      />
    </motion.div>
  );
};

export default ProjectCard;
