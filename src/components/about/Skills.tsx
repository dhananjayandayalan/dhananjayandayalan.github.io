import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';

const Skills = () => {
  // Rotate through accent colors for skill category cards
  const accentColors = ['bg-brutal-pink', 'bg-brutal-cyan', 'bg-brutal-yellow', 'bg-brutal-lime'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skills.map((skillCategory, index) => {
        const bgColor = accentColors[index % accentColors.length];

        return (
          <motion.div
            key={skillCategory.category}
            className={`${bgColor} border-4 border-brutal-black dark:border-brutal-white rounded-none p-6 shadow-brutal-md dark:shadow-brutal-md-light hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm dark:hover:shadow-brutal-sm-light transition-brutal`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          >
            <h3 className="text-xl font-black mb-4 text-brutal-black">
              {skillCategory.category}
            </h3>
            <ul className="space-y-2">
              {skillCategory.items.map((skill) => (
                <li
                  key={skill}
                  className="text-brutal-black flex items-center font-semibold"
                >
                  <span className="w-2 h-2 bg-brutal-black border border-brutal-black mr-2 flex-shrink-0"></span>
                  {skill}
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
