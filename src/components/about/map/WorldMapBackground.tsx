'use client';

import { useTheme } from '../../../context/ThemeContext';

const WorldMapBackground = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Decorative Background Grid */}
      <div className='absolute inset-0 opacity-20 z-0'>
        <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern
              id='grid'
              width='40'
              height='40'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 40 0 L 0 0 0 40'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
              />
            </pattern>
          </defs>
          <rect
            width='100%'
            height='100%'
            fill='url(#grid)'
            className='text-brutal-black dark:text-brutal-white'
          />
        </svg>
      </div>

      {/* World Map Background */}
      <div className='absolute inset-0 z-10 flex items-center justify-center p-8'>
        <img
          src='/world-map.svg'
          alt='World Map'
          className='w-full h-full object-contain'
          style={{
            opacity: 0.9,
            filter: theme === 'dark' ? 'invert(1)' : 'none'
          }}
        />
      </div>
    </>
  );
};

export default WorldMapBackground;
