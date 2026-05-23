'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import { projects } from '@/data/portfolio';

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slideVariants = {
    enter: (slideDirection: number) => ({
      x: slideDirection > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (slideDirection: number) => ({
      zIndex: 0,
      x: slideDirection < 0 ? 1000 : -1000,
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
      if (nextIndex < 0) return projects.length - 1;
      if (nextIndex >= projects.length) return 0;
      return nextIndex;
    });
  };

  useLayoutEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGestureZoom = (e: Event) => {
      e.preventDefault();
    };

    carouselElement.addEventListener('touchstart', preventPinchZoom, { passive: false });
    carouselElement.addEventListener('touchmove', preventPinchZoom, { passive: false });
    carouselElement.addEventListener('gesturestart', preventGestureZoom, { passive: false } as AddEventListenerOptions);
    carouselElement.addEventListener('gesturechange', preventGestureZoom, { passive: false } as AddEventListenerOptions);
    carouselElement.addEventListener('gestureend', preventGestureZoom, { passive: false } as AddEventListenerOptions);

    return () => {
      carouselElement.removeEventListener('touchstart', preventPinchZoom);
      carouselElement.removeEventListener('touchmove', preventPinchZoom);
      carouselElement.removeEventListener('gesturestart', preventGestureZoom);
      carouselElement.removeEventListener('gesturechange', preventGestureZoom);
      carouselElement.removeEventListener('gestureend', preventGestureZoom);
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          My <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-lg text-foreground-muted dark:text-foreground-subtle">
          A collection of my personal projects and work
        </p>
      </motion.div>

      <div className="relative">
        {projects.length > 0 ? (
          <>
            <div
              ref={carouselRef}
              className="relative min-h-[680px] overflow-visible max-[460px]:min-h-[760px] md:h-[550px] md:min-h-0 md:overflow-hidden"
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragDirectionLock
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  dragMomentum={false}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  style={{ touchAction: 'pan-y' }}
                  className="absolute inset-x-0 top-0 mx-auto w-full max-w-2xl cursor-grab px-4 active:cursor-grabbing md:inset-y-0"
                >
                  <ProjectCard project={projects[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {projects.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[color:var(--border-primary)] bg-[color:var(--bg-secondary)] p-3 text-foreground-muted shadow-soft-md lg:block md:left-0 dark:text-foreground-subtle"
                  onClick={() => paginate(-1)}
                  aria-label="Previous project"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[color:var(--border-primary)] bg-[color:var(--bg-secondary)] p-3 text-foreground-muted shadow-soft-md lg:block md:right-0 dark:text-foreground-subtle"
                  onClick={() => paginate(1)}
                  aria-label="Next project"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {projects.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-smooth ${
                      index === currentIndex
                        ? 'w-8 bg-accent-primary'
                        : 'w-2.5 bg-slate-300 hover:bg-accent-secondary dark:bg-slate-700'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <motion.div
              className="mt-6 text-center text-foreground-primary dark:text-foreground-inverse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <span className="text-lg font-semibold">
                {currentIndex + 1} / {projects.length}
              </span>
            </motion.div>

            {projects.length > 1 && (
              <motion.p
                className="mt-4 text-center text-sm text-foreground-muted dark:text-foreground-subtle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
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
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex h-[400px] flex-col items-center justify-center rounded-3xl border border-[color:var(--border-primary)] bg-[color:var(--bg-secondary)] p-8 text-center shadow-soft-md"
          >
            <svg
              className="mb-6 h-24 w-24 text-foreground-muted dark:text-foreground-subtle"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mb-2 text-2xl font-semibold text-foreground-primary dark:text-foreground-inverse">
              No Projects Yet
            </h3>
            <p className="max-w-md text-foreground-muted dark:text-foreground-subtle">
              Projects will be added soon. Stay tuned.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
