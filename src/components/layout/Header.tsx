'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <motion.header
      className="border-b-4 border-brutal-black dark:border-brutal-white sticky top-0 z-50"
      style={{ backgroundColor: 'var(--bg-primary, #FFFFFF)' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.1, ease: 'linear' }}
    >
      <nav className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.1 }}
          >
            <Link href="/about" className="text-2xl font-black text-gradient transition-brutal">
              {personalInfo.name}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.1 }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-lg font-bold transition-brutal ${
                    isActive
                      ? 'text-brutal-cyan border-b-4 border-brutal-cyan'
                      : 'text-brutal-black dark:text-brutal-white hover:text-brutal-pink hover:border-b-4 hover:border-brutal-pink'
                  }`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.1 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              );
            })}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brutal-black dark:text-brutal-white border-3 border-brutal-black dark:border-brutal-white p-2 transition-brutal hover:bg-brutal-yellow"
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 border-t-3 border-brutal-black dark:border-brutal-white pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.1, ease: 'linear' }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 mb-2 transition-brutal font-bold ${isActive && 'border-3'}`}
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
