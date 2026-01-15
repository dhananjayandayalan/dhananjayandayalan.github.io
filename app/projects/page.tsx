'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import TabSwitch from '@/components/projects/TabSwitch';
import { projectCategories } from '@/data/portfolio';

export default function Projects() {
  const [activeTab, setActiveTab] = useState(projectCategories[0]?.id || 'hobby');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentProjects = useMemo(() => {
    const category = projectCategories.find(cat => cat.id === activeTab);
    return category?.projects || [];
  }, [activeTab]);

  const tabs = useMemo(() =>
    projectCategories.map(cat => ({ id: cat.id, name: cat.name })),
    []
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentIndex(0);
    setDirection(0);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return currentProjects.length - 1;
      if (nextIndex >= currentProjects.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: 'linear' }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          My <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-lg text-brutal-gray-dark dark:text-brutal-gray-light font-bold">
          A collection of my personal projects and work
        </p>
      </motion.div>

      {/* Tab Switch */}
      <TabSwitch tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Carousel Container */}
      <div className="relative">
        {currentProjects.length > 0 ? (
          <>
            {/* Carousel */}
            <div className="relative h-[600px] md:h-[550px] flex items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={`${activeTab}-${currentIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute w-full max-w-2xl px-4 cursor-grab active:cursor-grabbing"
                >
                  <ProjectCard project={currentProjects[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {currentProjects.length > 1 && (
              <>
                <button
                  className="hidden lg:block absolute left-2 md:left-0 top-1/2 -translate-y-1/2 bg-brutal-yellow border-4 border-brutal-black dark:border-brutal-white text-brutal-black p-3 rounded-none z-10 shadow-brutal-md dark:shadow-brutal-md-light"
                  onClick={() => paginate(-1)}
                  aria-label="Previous project"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="hidden lg:block absolute right-2 md:right-0 top-1/2 -translate-y-1/2 bg-brutal-yellow border-4 border-brutal-black dark:border-brutal-white text-brutal-black p-3 rounded-none z-10 shadow-brutal-md dark:shadow-brutal-md-light"
                  onClick={() => paginate(1)}
                  aria-label="Next project"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Indicators */}
            {currentProjects.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {currentProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-3 rounded-none transition-brutal border-3 border-brutal-black dark:border-brutal-white ${
                      index === currentIndex
                        ? 'w-8 bg-brutal-pink'
                        : 'w-3 bg-brutal-white dark:bg-brutal-black hover:bg-brutal-cyan'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Counter */}
            <motion.div
              className="text-center mt-6 text-brutal-black dark:text-brutal-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, ease: 'linear' }}
            >
              <span className="text-lg font-black">
                {currentIndex + 1} / {currentProjects.length}
              </span>
            </motion.div>

            {/* Instructions */}
            {currentProjects.length > 1 && (
              <motion.p
                className="text-center mt-4 text-brutal-gray-dark dark:text-brutal-gray-light text-sm font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              >
                  <span className="hidden lg:inline">Drag or use arrows to navigate</span>
                  <span className="lg:hidden">Drag to Navigate</span>
              </motion.p>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="flex flex-col items-center justify-center h-[400px] text-center bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white rounded-none p-8 shadow-brutal-md dark:shadow-brutal-md-light"
          >
            <svg
              className="w-24 h-24 mb-6 text-brutal-gray-dark dark:text-brutal-gray-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-2xl font-black mb-2 text-brutal-black dark:text-brutal-white">
              No Projects Yet
            </h3>
            <p className="text-brutal-gray-dark dark:text-brutal-gray-light max-w-md font-bold">
              Projects in this category will be added soon. Stay tuned!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
