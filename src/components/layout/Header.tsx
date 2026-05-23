'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[color:var(--border-primary)] backdrop-blur"
      style={{ backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.94)' : 'rgba(15, 23, 42, 0.92)' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <nav className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.2 }}
          >
            <Link href="/about" className="text-2xl font-extrabold text-gradient transition-smooth">
              {personalInfo.name}
            </Link>
          </motion.div>

          <motion.div
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.2 }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`border-b-2 pb-1 text-lg font-medium transition-smooth ${
                    isActive
                      ? 'border-accent-primary text-accent-primary'
                      : 'border-transparent hover:border-accent-primary hover:text-accent-primary'
                  }`}
                  style={
                    isActive
                      ? undefined
                      : { color: theme === 'light' ? '#334155' : '#E2E8F0' }
                  }
                >
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              );
            })}
          </motion.div>

          <button
            className="md:hidden rounded-full border border-[color:var(--border-primary)] p-2 text-foreground-primary transition-smooth hover:bg-[color:var(--bg-elevated)] dark:text-foreground-inverse"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="mt-4 border-t border-[color:var(--border-primary)] pb-4 pt-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mb-2 block rounded-xl px-4 py-3 transition-smooth ${
                    isActive
                      ? 'bg-[color:var(--accent-soft)] text-accent-primary'
                      : 'hover:bg-[color:var(--bg-elevated)]'
                  }`}
                  style={
                    isActive
                      ? undefined
                      : { color: theme === 'light' ? '#334155' : '#E2E8F0' }
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
