import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';
import { useTheme } from '@/context/ThemeContext';

const Skills = () => {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {skills.map((skillCategory, index) => {
        return (
          <motion.div
            key={skillCategory.category}
            className="rounded-2xl border-2 border-[color:var(--border-primary)] p-6 shadow-soft-md"
            style={{
              backgroundColor:
                theme === 'light'
                  ? 'var(--bg-secondary)'
                  : 'rgba(15, 23, 42, 0.8)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <h3 className="mb-4 inline-block border-b-2 border-accent-primary pb-1 text-xl font-semibold text-foreground-primary dark:text-foreground-inverse">
              {skillCategory.category}
            </h3>
            <ul className="space-y-3">
              {skillCategory.items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-start text-sm font-medium text-foreground-muted dark:text-foreground-subtle"
                >
                  <span className="mr-3 flex-shrink-0 font-semibold text-accent-primary">-</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Skills;
