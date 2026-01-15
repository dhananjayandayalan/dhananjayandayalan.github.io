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
  const accentColors = ['bg-brutal-pink', 'bg-brutal-cyan', 'bg-brutal-yellow', 'bg-brutal-lime'];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: 'linear' }}
      >
        {/* Header Section */}
        <div className="space-y-3 pb-4 border-b-4 border-brutal-black dark:border-brutal-white">
          <h2 className="text-3xl font-black text-gradient">{company}</h2>
          <p className="text-xl text-brutal-black dark:text-brutal-white font-bold">{position}</p>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 bg-brutal-cyan rounded-none border-3 border-brutal-black dark:border-brutal-white">
              <svg className="w-6 h-6 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-brutal-gray-dark dark:text-brutal-gray-light">Duration</p>
              <p className="text-lg text-brutal-black dark:text-brutal-white font-black">{period}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-3 bg-brutal-pink rounded-none border-3 border-brutal-black dark:border-brutal-white">
              <svg className="w-6 h-6 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="square" strokeLinejoin="miter" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-brutal-gray-dark dark:text-brutal-gray-light">Location</p>
              <p className="text-lg text-brutal-black dark:text-brutal-white font-black">{city}</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="space-y-3 pt-4 border-t-4 border-brutal-black dark:border-brutal-white">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-brutal-black dark:text-brutal-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h3 className="text-lg font-black text-brutal-black dark:text-brutal-white">Tech Stack</h3>
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-brutal-pink/50">
            {techStack.map((tech, index) => {
              const badgeColor = accentColors[index % accentColors.length];
              return (
                <span
                  key={tech}
                  className={`text-sm ${badgeColor} text-brutal-black px-4 py-2 rounded-none border-3 border-brutal-black dark:border-brutal-white font-bold whitespace-nowrap flex-shrink-0`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t-3 border-brutal-black dark:border-brutal-white">
          <p className="text-sm text-brutal-gray-dark dark:text-brutal-gray-light font-bold">
            Click outside or press ESC to close
          </p>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ExperienceCardModal;
