import { motion } from 'framer-motion';
import Modal from '../common/Modal';

interface UnderConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

const UnderConstructionModal = ({ isOpen, onClose, projectName }: UnderConstructionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center py-8 px-4">
        {/* Construction Icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'linear',
          }}
          className="mb-6"
        >
          <svg
            className="w-24 h-24 text-brutal-yellow"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="text-3xl font-black mb-4 text-center"
        >
          <span className="text-gradient">Under Construction</span>
        </motion.h2>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="text-center space-y-4 max-w-md"
        >
          <p className="text-brutal-black dark:text-brutal-white text-lg font-bold">
            The live demo for <span className="text-brutal-cyan font-black">{projectName}</span> is currently under construction.
          </p>
          <p className="text-brutal-gray-dark dark:text-brutal-gray-light text-sm font-semibold">
            This project is being worked on and will be deployed soon. Check back later for the live version!
          </p>
        </motion.div>

        {/* Decorative construction barrier */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="mt-8 w-full max-w-sm"
        >
          <div className="h-4 rounded-none border-3 border-brutal-black dark:border-brutal-white"
               style={{
                 backgroundImage: 'repeating-linear-gradient(45deg, #FFEB3B 0px, #FFEB3B 20px, #000000 20px, #000000 40px)'
               }}
          />
        </motion.div>

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          onClick={onClose}
          className="mt-8 px-6 py-3 bg-brutal-yellow border-4 border-brutal-black dark:border-brutal-white rounded-none font-black transition-brutal shadow-brutal-sm dark:shadow-brutal-sm-light hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        >
          Got it!
        </motion.button>
      </div>
    </Modal>
  );
};

export default UnderConstructionModal;
