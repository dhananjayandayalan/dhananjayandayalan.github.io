import { motion } from 'framer-motion';
import Modal from '../../common/Modal';

interface ExperienceCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: string;
  position: string;
  period: string;
  city: string;
  techStack: string[];
}

const ExperienceCardModal = ({ isOpen, onClose, company, position, period, city, techStack }: ExperienceCardModalProps) => {
  // Rotate through accent colors for tech stack badges
  const accentColors = ['bg-accent-primary', 'bg-accent-secondary', 'bg-surface-muted', 'bg-surface-subtle'];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: 'linear' }}
      >
        {/* Header Section */}
        <div className="space-y-3 border-b-4 border-foreground-primary pb-4 dark:border-foreground-inverse">
          <h2 className="text-3xl font-black text-gradient">{company}</h2>
          <p className="text-xl font-bold text-foreground-primary dark:text-foreground-inverse">{position}</p>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="rounded-none border-3 border-foreground-primary bg-accent-secondary p-3 dark:border-foreground-inverse">
              <svg className="h-6 w-6 text-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground-muted dark:text-foreground-subtle">Duration</p>
              <p className="text-lg font-black text-foreground-primary dark:text-foreground-inverse">{period}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="rounded-none border-3 border-foreground-primary bg-accent-primary p-3 dark:border-foreground-inverse">
              <svg className="h-6 w-6 text-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="square" strokeLinejoin="miter" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground-muted dark:text-foreground-subtle">Location</p>
              <p className="text-lg font-black text-foreground-primary dark:text-foreground-inverse">{city}</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="space-y-3 border-t-4 border-foreground-primary pt-4 dark:border-foreground-inverse">
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-foreground-primary dark:text-foreground-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h3 className="text-lg font-black text-foreground-primary dark:text-foreground-inverse">Tech Stack</h3>
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-accent-primary/50">
            {techStack.map((tech, index) => {
              const badgeColor = accentColors[index % accentColors.length];
              return (
                <span
                  key={tech}
                  className={`text-sm ${badgeColor} px-4 py-2 rounded-none border-3 border-foreground-primary font-bold text-foreground-primary whitespace-nowrap flex-shrink-0 dark:border-foreground-inverse`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t-3 border-foreground-primary pt-4 dark:border-foreground-inverse">
          <p className="text-sm font-bold text-foreground-muted dark:text-foreground-subtle">
            Click outside or press ESC to close
          </p>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ExperienceCardModal;
