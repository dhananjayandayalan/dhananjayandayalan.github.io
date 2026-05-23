import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { useTheme } from '@/context/ThemeContext';

const contactItems = [
  {
    href: `mailto:${personalInfo.email}`,
    label: 'Email',
    value: personalInfo.email,
    iconBg: 'bg-blue-50 dark:bg-blue-500/15',
    icon: (
      <svg className="h-6 w-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: personalInfo.linkedIn,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    iconBg: 'bg-teal-50 dark:bg-teal-500/15',
    external: true,
    icon: (
      <svg className="h-6 w-6 text-accent-secondary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const ContactCard = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      className="rounded-3xl border border-[color:var(--border-primary)] bg-[color:var(--bg-secondary)] p-6 shadow-soft-md md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <h3 className="mb-6 text-2xl font-semibold text-gradient">Connect with me</h3>

      <div className="space-y-4">
        {contactItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className="group flex items-center space-x-4 rounded-2xl border border-[color:var(--border-primary)] p-4 transition-smooth hover:-translate-y-0.5 hover:shadow-soft-sm"
            style={{
              backgroundColor: theme === 'light' ? 'var(--bg-secondary)' : 'rgba(15, 23, 42, 0.8)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`rounded-2xl border border-[color:var(--border-primary)] p-3 ${item.iconBg}`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground-muted dark:text-foreground-subtle">{item.label}</p>
              <p className="font-medium text-foreground-primary dark:text-foreground-inverse">{item.value}</p>
            </div>
            <svg className="h-5 w-5 text-foreground-muted transition-smooth group-hover:text-accent-primary dark:text-foreground-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        ))}

        <div className="border-t border-[color:var(--border-primary)] pt-6">
          <p className="text-sm leading-relaxed text-foreground-muted dark:text-foreground-subtle">
            Feel free to reach out for collaborations, opportunities, or just to say hi. I&apos;m always open to discussing new projects and ideas.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-foreground-muted dark:text-foreground-subtle">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Usually responds within 24 hours</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
