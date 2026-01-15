import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

interface LocationPinProps {
  x: number;
  y: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  delay: number;
}

const LocationPin = ({ x, y, isHovered, onMouseEnter, onMouseLeave, onClick, delay }: LocationPinProps) => {
  const { theme } = useTheme();

  // Theme-aware colors
  const colors = {
    default: theme === 'dark' ? '#76FF03' : '#00E5FF', // brutal-lime (dark) / brutal-cyan (light)
    hovered: theme === 'dark' ? '#FFEB3B' : '#FF1493', // brutal-yellow (dark) / brutal-pink (light)
    stroke: theme === 'dark' ? '#FFFFFF' : '#000000',  // white (dark) / black (light)
  };

  return (
    <g>
      {/* Invisible larger hit area for better touch/click targeting */}
      <circle
        cx={x}
        cy={y}
        r="2"
        fill="transparent"
        className="cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{ pointerEvents: 'all' }}
      />

      {/* Pin Circle */}
      <motion.circle
        cx={x}
        cy={y}
        r="0.5"
        fill={isHovered ? colors.hovered : colors.default}
        stroke={colors.stroke}
        strokeWidth="0.3"
        className="cursor-pointer pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1, ease: 'linear' }}
        whileHover={{ scale: 1.5 }}
      />
      {/* Pulse Animation */}
      {isHovered && (
        <motion.circle
          cx={x}
          cy={y}
          r="1.2"
          fill="none"
          stroke={colors.hovered}
          strokeWidth="0.3"
          className="pointer-events-none"
          initial={{ r: 1.2, opacity: 0.8 }}
          animate={{ r: 3, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </g>
  );
};

export default LocationPin;
