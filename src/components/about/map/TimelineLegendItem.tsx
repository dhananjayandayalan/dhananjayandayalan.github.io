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
  const accentColors = ['bg-brutal-pink', 'bg-brutal-cyan', 'bg-brutal-yellow', 'bg-brutal-lime'];
  const bgColor = accentColors[index % accentColors.length];

  return (
    <motion.div
      className={`flex items-center space-x-3 cursor-pointer px-3 py-2 border-2 border-brutal-black dark:border-brutal-white rounded-none ${bgColor} shadow-brutal-sm dark:shadow-brutal-sm-light ${
        isHovered ? 'translate-x-0.5 translate-y-0.5 shadow-none' : ''
      } transition-brutal`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <span className="text-2xl font-black text-brutal-black w-8 text-center">{index + 1}</span>
      <div className="border-l-3 border-brutal-black dark:border-brutal-black pl-3">
        <p className="text-sm font-black text-brutal-black">{company}</p>
        <p className="text-xs text-brutal-black font-bold">{city}</p>
      </div>
    </motion.div>
  );
};

export default TimelineLegendItem;
