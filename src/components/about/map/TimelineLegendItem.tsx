import { motion } from 'framer-motion';

interface TimelineLegendItemProps {
  index: number;
  company: string;
  city: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const TimelineLegendItem = ({ index, company, city, isHovered, onMouseEnter, onMouseLeave, onClick }: TimelineLegendItemProps) => {
  // Rotate through accent colors for timeline items
  const accentColors = ['bg-accent-primary', 'bg-accent-secondary', 'bg-surface-muted', 'bg-surface-subtle'];
  const bgColor = accentColors[index % accentColors.length];

  return (
    <motion.div
      className={`flex cursor-pointer items-center space-x-3 rounded-none border-2 border-foreground-primary px-3 py-2 shadow-soft-sm dark:border-foreground-inverse ${bgColor} ${
        isHovered ? 'translate-x-0.5 translate-y-0.5 shadow-none' : ''
      } transition-smooth`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <span className="w-8 text-center text-2xl font-black text-foreground-primary">{index + 1}</span>
      <div className="border-l-3 border-foreground-primary pl-3 dark:border-foreground-primary">
        <p className="text-sm font-black text-foreground-primary">{company}</p>
        <p className="text-xs font-bold text-foreground-primary">{city}</p>
      </div>
    </motion.div>
  );
};

export default TimelineLegendItem;
