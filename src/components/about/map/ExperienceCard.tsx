import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  company: string;
  position: string;
  posX: number;
  posY: number;
}

const ExperienceCard = ({ company, position, posX, posY }: ExperienceCardProps) => {
  const { theme } = useTheme();
  return (
    <motion.div
      className="absolute bg-brutal-yellow dark:bg-brutal-lime border-2 sm:border-3 md:border-4 border-brutal-black dark:border-brutal-white rounded-none p-2 sm:p-2.5 md:p-3 shadow-brutal-sm sm:shadow-brutal-md dark:shadow-brutal-sm-light dark:sm:shadow-brutal-md-light z-50 min-w-40 sm:min-w-[200px] md:min-w-[220px] max-w-[200px] sm:max-w-60 md:max-w-[280px] pointer-events-none"
      style={{
        left: `${posX}%`,
        top: `${posY}%`,
        transform: 'translate(-50%, -120%)',
        background: theme === 'dark' ? '#000' : '#fff',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.1, ease: 'linear' }}
    >
      <div className="space-y-1 sm:space-y-1.5">
        <h3 className="text-xs sm:text-sm md:text-sm font-black text-brutal-black dark:text-brutal-black leading-tight">{company}</h3>
        <p className="text-[10px] sm:text-xs md:text-xs text-brutal-black dark:text-brutal-black font-bold leading-tight">{position}</p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
