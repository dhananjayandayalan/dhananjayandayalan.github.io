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
      className="absolute z-50 min-w-40 max-w-[200px] rounded-none border-2 border-foreground-primary bg-surface-muted p-2 shadow-soft-sm pointer-events-none sm:min-w-[200px] sm:max-w-60 sm:border-3 sm:p-2.5 sm:shadow-soft-md md:min-w-[220px] md:max-w-[280px] md:border-4 md:p-3 dark:border-foreground-inverse dark:bg-surface-subtle"
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
        <h3 className="text-xs font-black leading-tight text-foreground-primary dark:text-foreground-primary sm:text-sm md:text-sm">{company}</h3>
        <p className="text-[10px] font-bold leading-tight text-foreground-primary dark:text-foreground-primary sm:text-xs md:text-xs">{position}</p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
