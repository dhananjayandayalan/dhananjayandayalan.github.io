'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/contact/ContactForm';
import ContactCard from '@/components/contact/ContactCard';

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-foreground-muted dark:text-foreground-subtle">
          Have a question or want to work together? I'd love to hear from you!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>

        {/* Contact Card */}
        <div>
          <ContactCard />
        </div>
      </div>
    </div>
  );
}
