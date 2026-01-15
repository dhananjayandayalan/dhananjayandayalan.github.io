import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

const ContactCard = () => {
  return (
    <motion.div
      className="bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white rounded-none p-6 md:p-8 shadow-brutal-md dark:shadow-brutal-md-light"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: 'linear' }}
    >
      <h3 className="text-2xl font-black mb-6 text-gradient">Connect with me</h3>

      <div className="space-y-6">
        {/* Email */}
        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="flex items-center space-x-4 p-4 bg-brutal-cyan border-3 border-brutal-black dark:border-brutal-white rounded-none hover:bg-brutal-pink transition-brutal group"
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-brutal-yellow p-3 rounded-none border-3 border-brutal-black dark:border-brutal-white">
            <svg className="w-6 h-6 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-brutal-black font-bold">Email</p>
            <p className="text-brutal-black font-black">{personalInfo.email}</p>
          </div>
          <svg className="w-5 h-5 text-brutal-black transition-brutal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
          </svg>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href={personalInfo.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 p-4 bg-brutal-pink border-3 border-brutal-black dark:border-brutal-white rounded-none hover:bg-brutal-lime transition-brutal group"
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-brutal-yellow p-3 rounded-none border-3 border-brutal-black dark:border-brutal-white">
            <svg className="w-6 h-6 text-brutal-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-brutal-black font-bold">LinkedIn</p>
            <p className="text-brutal-black font-black">Connect on LinkedIn</p>
          </div>
          <svg className="w-5 h-5 text-brutal-black transition-brutal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
          </svg>
        </motion.a>

        {/* Additional Info */}
        <div className="pt-6 border-t-3 border-brutal-black dark:border-brutal-white">
          <p className="text-brutal-black dark:text-brutal-white text-sm leading-relaxed font-semibold">
            Feel free to reach out for collaborations, opportunities, or just to say hi! I'm always open to discussing new projects and ideas.
          </p>
        </div>

        {/* Response Time */}
        <div className="flex items-center space-x-2 text-sm text-brutal-gray-dark dark:text-brutal-gray-light font-bold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Usually responds within 24 hours</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
