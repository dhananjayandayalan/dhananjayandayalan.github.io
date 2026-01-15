import { motion } from 'framer-motion';

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
}

const ConnectionLine = ({ startX, startY, endX, endY, delay }: ConnectionLineProps) => {
  return (
    <motion.g>
      {/* Dotted Line */}
      <motion.line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#FF1493"
        strokeWidth="0.3"
        strokeDasharray="1,1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay, ease: 'linear' }}
      />
    </motion.g>
  );
};

export default ConnectionLine;
