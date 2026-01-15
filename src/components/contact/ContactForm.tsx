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
      className="space-y-6 bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white rounded-none p-6 md:p-8 shadow-brutal-md dark:shadow-brutal-md-light"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: 'linear' }}
    >
      <h3 className="text-2xl font-black mb-6 text-gradient">Send me a message</h3>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-brutal-black dark:text-brutal-white mb-2">
          Name <span className="text-brutal-pink">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-3 bg-brutal-white dark:bg-brutal-black border-3 border-brutal-black dark:border-brutal-white rounded-none focus:border-brutal-cyan outline-none transition-brutal text-brutal-black dark:text-brutal-white placeholder-brutal-gray-dark dark:placeholder-brutal-gray-light font-semibold"
          placeholder="Your name"
        />
        {errors.name && (
          <motion.p
            className="mt-2 text-sm text-brutal-pink font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {errors.name.message}
          </motion.p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-brutal-black dark:text-brutal-white mb-2">
          Email <span className="text-brutal-pink">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-3 bg-brutal-white dark:bg-brutal-black border-3 border-brutal-black dark:border-brutal-white rounded-none focus:border-brutal-cyan outline-none transition-brutal text-brutal-black dark:text-brutal-white placeholder-brutal-gray-dark dark:placeholder-brutal-gray-light font-semibold"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <motion.p
            className="mt-2 text-sm text-brutal-pink font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      {/* Mobile Field */}
      <div>
        <label htmlFor="mobile" className="block text-sm font-bold text-brutal-black dark:text-brutal-white mb-2">
          Mobile <span className="text-brutal-gray-dark dark:text-brutal-gray-light">(Optional)</span>
        </label>
        <input
          {...register('mobile')}
          type="tel"
          id="mobile"
          className="w-full px-4 py-3 bg-brutal-white dark:bg-brutal-black border-3 border-brutal-black dark:border-brutal-white rounded-none focus:border-brutal-cyan outline-none transition-brutal text-brutal-black dark:text-brutal-white placeholder-brutal-gray-dark dark:placeholder-brutal-gray-light font-semibold"
          placeholder="Your mobile number"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-brutal-black dark:text-brutal-white mb-2">
          Message <span className="text-brutal-pink">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          className="w-full px-4 py-3 bg-brutal-white dark:bg-brutal-black border-3 border-brutal-black dark:border-brutal-white rounded-none focus:border-brutal-cyan outline-none transition-brutal text-brutal-black dark:text-brutal-white placeholder-brutal-gray-dark dark:placeholder-brutal-gray-light resize-none font-semibold"
          placeholder="Your message..."
        />
        {errors.message && (
          <motion.p
            className="mt-2 text-sm text-brutal-pink font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {errors.message.message}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brutal-pink border-4 border-brutal-black dark:border-brutal-white text-brutal-white font-black py-3 px-6 rounded-none transition-brutal shadow-brutal-sm dark:shadow-brutal-sm-light hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brutal-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>

      <p className="text-sm text-brutal-gray-dark dark:text-brutal-gray-light text-center font-bold">
        Press Enter or click the button to submit
      </p>
    </motion.form>
  );
};

export default ContactForm;
