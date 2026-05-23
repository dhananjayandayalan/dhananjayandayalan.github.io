import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import type { ContactFormData } from '../../types';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

const fieldClassName =
  'w-full rounded-2xl border border-[color:var(--border-primary)] bg-[color:var(--bg-secondary)] px-4 py-3 text-foreground-primary outline-none transition-smooth placeholder:text-foreground-subtle focus:border-accent-primary focus:ring-4 focus:ring-blue-100 dark:text-foreground-inverse dark:focus:ring-blue-500/15';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Thank you for your message! I will get back to you soon.');
    reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      className="space-y-6 rounded-3xl border border-[color:var(--border-primary)] bg-[color:var(--bg-secondary)] p-6 shadow-soft-md md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <h3 className="mb-6 text-2xl font-semibold text-gradient">Send me a message</h3>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground-primary dark:text-foreground-inverse">
          Name <span className="text-accent-primary">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className={fieldClassName}
          placeholder="Your name"
        />
        {errors.name && (
          <motion.p
            className="mt-2 text-sm text-rose-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {errors.name.message}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground-primary dark:text-foreground-inverse">
          Email <span className="text-accent-primary">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={fieldClassName}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <motion.p
            className="mt-2 text-sm text-rose-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="mobile" className="mb-2 block text-sm font-medium text-foreground-primary dark:text-foreground-inverse">
          Mobile <span className="text-foreground-muted dark:text-foreground-subtle">(Optional)</span>
        </label>
        <input
          {...register('mobile')}
          type="tel"
          id="mobile"
          className={fieldClassName}
          placeholder="Your mobile number"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground-primary dark:text-foreground-inverse">
          Message <span className="text-accent-primary">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          className={`${fieldClassName} resize-none`}
          placeholder="Your message..."
        />
        {errors.message && (
          <motion.p
            className="mt-2 text-sm text-rose-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {errors.message.message}
          </motion.p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full border border-[color:var(--border-primary)] bg-accent-primary px-6 py-3 font-medium text-foreground-inverse shadow-soft-sm transition-smooth hover:-translate-y-0.5 hover:shadow-soft-md disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-foreground-inverse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>

      <p className="text-center text-sm text-foreground-muted dark:text-foreground-subtle">
        Press Enter or click the button to submit
      </p>
    </motion.form>
  );
};

export default ContactForm;
