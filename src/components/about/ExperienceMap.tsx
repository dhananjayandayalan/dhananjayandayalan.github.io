import { useState, useRef, useLayoutEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';
import ConnectionLine from './map/ConnectionLine';
import LocationPin from './map/LocationPin';
import ExperienceCard from './map/ExperienceCard';
import TimelineLegendItem from './map/TimelineLegendItem';
import ExperienceCardModal from './map/ExperienceCardModal';
import type { Experience } from '../../types';

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ExperienceMap = () => {
  const { theme } = useTheme();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [dragTransform, setDragTransform] = useState({ x: 0, y: 0 });
  const [forceUpdate, setForceUpdate] = useState(0);
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialViewBoxForPinch, setInitialViewBoxForPinch] = useState<ViewBox | null>(null);

  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const startPointRef = useRef({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const contentGroupRef = useRef<SVGGElement>(null);
  const rafRef = useRef<number | null>(null);

  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 50;
    return { x, y };
  };

  const currentExperience = useMemo(
    () => experiences.find((experience) => experience.period.includes('Present')) ?? experiences[experiences.length - 1],
    []
  );

  const defaultViewBox = useMemo(() => ({ x: 0, y: 0, width: 100, height: 50 }), []);
  const focusedViewBox = useMemo(() => {
    const currentPosition = getPosition(
      currentExperience.location.coordinates.lat,
      currentExperience.location.coordinates.lng
    );
    const width = 24;
    const height = 14;

    return {
      x: currentPosition.x - width / 2,
      y: currentPosition.y - height / 2,
      width,
      height,
    };
  }, [currentExperience]);

  const [viewBox, setViewBox] = useState<ViewBox>(focusedViewBox);
  const initialViewBoxRef = useRef<ViewBox>(focusedViewBox);

  const handleZoom = (delta: number) => {
    setViewBox((prev) => {
      const zoomFactor = delta > 0 ? 1.25 : 0.8;
      const newWidth = prev.width * zoomFactor;
      const newHeight = prev.height * zoomFactor;

      if (newWidth < 20 || newWidth > 200) return prev;

      const centerX = prev.x + prev.width / 2;
      const centerY = prev.y + prev.height / 2;

      if (hoveredId !== null) {
        requestAnimationFrame(() => setForceUpdate((previous) => previous + 1));
      }

      return {
        x: centerX - newWidth / 2,
        y: centerY - newHeight / 2,
        width: newWidth,
        height: newHeight,
      };
    });
  };

  const resetView = () => {
    setViewBox(focusedViewBox);
    if (hoveredId !== null) {
      requestAnimationFrame(() => setForceUpdate((previous) => previous + 1));
    }
  };

  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const screenToSVG = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  const svgToScreenPercent = (svgX: number, svgY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };

    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = svgX;
    pt.y = svgY;

    const screenPt = pt.matrixTransform(svg.getScreenCTM() || svg.createSVGMatrix());
    const svgRect = svg.getBoundingClientRect();

    const percentX = ((screenPt.x - svgRect.left) / svgRect.width) * 100;
    const percentY = ((screenPt.y - svgRect.top) / svgRect.height) * 100;

    return { x: percentX, y: percentY };
  };

  const handlePointerDown = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName === 'circle' || target.closest('circle')) return;

    setIsPanning(true);

    let clientX: number;
    let clientY: number;

    if ('touches' in e && e.touches.length === 1) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const svgPoint = screenToSVG(clientX, clientY);
    startPointRef.current = svgPoint;
    initialViewBoxRef.current = viewBox;
    dragOffsetRef.current = { x: 0, y: 0 };
    setDragTransform({ x: 0, y: 0 });
  };

  const handlePointerMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!isPanning) return;

    let clientX: number;
    let clientY: number;

    if ('touches' in e && e.touches.length === 1) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const currentPoint = screenToSVG(clientX, clientY);
    const dx = currentPoint.x - startPointRef.current.x;
    const dy = currentPoint.y - startPointRef.current.y;

    dragOffsetRef.current = { x: dx, y: dy };

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (contentGroupRef.current) {
        contentGroupRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }

      if (hoveredId !== null) {
        setForceUpdate((previous) => previous + 1);
      }
    });
  };

  const handlePointerUp = () => {
    if (isPanning) {
      const dx = dragOffsetRef.current.x;
      const dy = dragOffsetRef.current.y;

      setViewBox({
        x: initialViewBoxRef.current.x - dx,
        y: initialViewBoxRef.current.y - dy,
        width: initialViewBoxRef.current.width,
        height: initialViewBoxRef.current.height,
      });

      if (contentGroupRef.current) {
        contentGroupRef.current.style.transform = '';
      }

      setDragTransform({ x: 0, y: 0 });
      dragOffsetRef.current = { x: 0, y: 0 };

      if (hoveredId !== null) {
        requestAnimationFrame(() => setForceUpdate((previous) => previous + 1));
      }
    }

    setIsPanning(false);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setInitialViewBoxForPinch(viewBox);
    } else if (e.touches.length === 1) {
      handlePointerDown(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2 && initialDistance && initialViewBoxForPinch) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
      const scale = initialDistance / currentDistance;

      const newWidth = initialViewBoxForPinch.width * scale;
      const newHeight = initialViewBoxForPinch.height * scale;

      if (newWidth < 20 || newWidth > 200) return;

      const centerX = initialViewBoxForPinch.x + initialViewBoxForPinch.width / 2;
      const centerY = initialViewBoxForPinch.y + initialViewBoxForPinch.height / 2;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setViewBox({
          x: centerX - newWidth / 2,
          y: centerY - newHeight / 2,
          width: newWidth,
          height: newHeight,
        });

        if (hoveredId !== null) {
          setForceUpdate((previous) => previous + 1);
        }
      });
    } else if (e.touches.length === 1) {
      handlePointerMove(e);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length < 2) {
      setInitialDistance(null);
      setInitialViewBoxForPinch(null);
    }

    if (e.touches.length === 0) {
      handlePointerUp();
    }
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    handleZoom(e.deltaY);
  };

  useLayoutEffect(() => {
    const preventContextMenu = (e: Event) => e.preventDefault();
    const svgElement = svgRef.current;

    if (svgElement) {
      svgElement.addEventListener('contextmenu', preventContextMenu);
      return () => svgElement.removeEventListener('contextmenu', preventContextMenu);
    }
  }, []);

  useLayoutEffect(() => {
    const mapElement = mapContainerRef.current;
    if (!mapElement) return;

    const preventWheelZoom = (e: WheelEvent) => {
      e.preventDefault();
    };

    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGestureZoom = (e: Event) => {
      e.preventDefault();
    };

    mapElement.addEventListener('wheel', preventWheelZoom, { passive: false });
    mapElement.addEventListener('touchstart', preventPinchZoom, { passive: false });
    mapElement.addEventListener('touchmove', preventPinchZoom, { passive: false });
    mapElement.addEventListener('gesturestart', preventGestureZoom, { passive: false } as AddEventListenerOptions);
    mapElement.addEventListener('gesturechange', preventGestureZoom, { passive: false } as AddEventListenerOptions);
    mapElement.addEventListener('gestureend', preventGestureZoom, { passive: false } as AddEventListenerOptions);

    return () => {
      mapElement.removeEventListener('wheel', preventWheelZoom);
      mapElement.removeEventListener('touchstart', preventPinchZoom);
      mapElement.removeEventListener('touchmove', preventPinchZoom);
      mapElement.removeEventListener('gesturestart', preventGestureZoom);
      mapElement.removeEventListener('gesturechange', preventGestureZoom);
      mapElement.removeEventListener('gestureend', preventGestureZoom);
    };
  }, []);

  useLayoutEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div
        ref={mapContainerRef}
        className="relative bg-brutal-white dark:bg-brutal-black rounded-none p-8 md:p-12 border-4 border-brutal-black dark:border-brutal-white overflow-hidden shadow-brutal-lg dark:shadow-brutal-lg-light"
      >
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
          <motion.button
            onClick={() => handleZoom(-1)}
            className="w-10 h-10 md:w-12 md:h-12 bg-brutal-yellow border-3 border-brutal-black dark:border-brutal-white shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center text-brutal-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Zoom in"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M12 5v14M5 12h14" />
            </svg>
          </motion.button>

          <motion.button
            onClick={() => handleZoom(1)}
            className="w-10 h-10 md:w-12 md:h-12 bg-brutal-cyan border-3 border-brutal-black dark:border-brutal-white shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center text-brutal-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Zoom out"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14" />
            </svg>
          </motion.button>

          <motion.button
            onClick={resetView}
            className="w-10 h-10 md:w-12 md:h-12 bg-brutal-pink border-3 border-brutal-black dark:border-brutal-white shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center text-brutal-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Reset to ${currentExperience.location.city}`}
            title={`Reset to ${currentExperience.location.city}`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M4 12a8 8 0 108-8 8.5 8.5 0 00-6 2.5M4 4v5h5" />
            </svg>
          </motion.button>
        </div>

        <svg
          ref={svgRef}
          className={`relative z-20 w-full h-[400px] md:h-[500px] ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="xMidYMid meet"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          style={{ touchAction: 'none', willChange: 'contents' }}
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 4 0 L 0 0 0 4"
                fill="none"
                stroke={theme === 'dark' ? '#FFFFFF' : '#000000'}
                strokeWidth="0.1"
                opacity="0.2"
              />
            </pattern>
          </defs>

          <g ref={contentGroupRef} style={{ willChange: isPanning ? 'transform' : 'auto' }}>
            <rect
              x="0"
              y="0"
              width="100"
              height="50"
              fill="url(#grid-pattern)"
            />

            <image
              href="/world-map.svg"
              x="0"
              y="0"
              width="100"
              height="50"
              opacity="0.9"
              style={{
                filter: theme === 'dark' ? 'invert(1)' : 'none'
              }}
            />

            {experiences.map((exp, index) => {
              if (index === experiences.length - 1) return null;
              const currentPos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
              const nextPos = getPosition(experiences[index + 1].location.coordinates.lat, experiences[index + 1].location.coordinates.lng);

              return (
                <ConnectionLine
                  key={`arrow-${exp.id}`}
                  startX={currentPos.x}
                  startY={currentPos.y}
                  endX={nextPos.x}
                  endY={nextPos.y}
                  delay={index * 0.5}
                />
              );
            })}

            {experiences.map((exp, index) => {
              const pos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
              return (
                <LocationPin
                  key={exp.id}
                  x={pos.x}
                  y={pos.y}
                  isHovered={hoveredId === exp.id}
                  onMouseEnter={() => setHoveredId(exp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedExperience(exp)}
                  delay={index * 0.5}
                />
              );
            })}
          </g>
        </svg>

        {hoveredId !== null && experiences.map((exp) => {
          if (hoveredId !== exp.id) return null;

          const pos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
          const screenPos = svgToScreenPercent(pos.x, pos.y);

          return (
            <AnimatePresence key={exp.id}>
              <ExperienceCard
                company={exp.company}
                position={exp.position}
                posX={screenPos.x}
                posY={screenPos.y}
              />
            </AnimatePresence>
          );
        })}
      </div>

      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: 'linear' }}
      >
        {experiences.map((exp, index) => (
          <TimelineLegendItem
            key={exp.id}
            index={index}
            company={exp.company}
            city={exp.location.city}
            isHovered={hoveredId === exp.id}
            onMouseEnter={() => setHoveredId(exp.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedExperience(exp)}
          />
        ))}
      </motion.div>

      {selectedExperience && (
        <ExperienceCardModal
          isOpen={selectedExperience !== null}
          onClose={() => setSelectedExperience(null)}
          company={selectedExperience.company}
          position={selectedExperience.position}
          period={selectedExperience.period}
          city={selectedExperience.location.city}
          techStack={selectedExperience.techStack}
        />
      )}
    </div>
  );
};

export default ExperienceMap;
