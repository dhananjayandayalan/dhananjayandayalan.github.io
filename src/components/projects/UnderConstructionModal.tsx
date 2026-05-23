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
      <div className="flex flex-col items-center justify-center px-4 py-8">
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
            className="h-20 w-20 text-amber-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mb-4 text-center text-3xl font-semibold"
        >
          <span className="text-gradient">Under Construction</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-md space-y-4 text-center"
        >
          <p className="text-lg text-foreground-primary dark:text-foreground-inverse">
            The live demo for <span className="font-semibold text-accent-primary">{projectName}</span> is currently under construction.
          </p>
          <p className="text-sm text-foreground-muted dark:text-foreground-subtle">
            This project is being worked on and will be deployed soon. Check back later for the live version.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-8 w-full max-w-sm overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        >
          <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="mt-8 rounded-full bg-accent-primary px-6 py-3 font-medium text-foreground-inverse shadow-soft-sm transition-smooth hover:-translate-y-0.5 hover:shadow-soft-md"
        >
          Got it
        </motion.button>
      </div>
    </Modal>
  );
};

export default UnderConstructionModal;
