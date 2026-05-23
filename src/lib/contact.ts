import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  mobile: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  message: z.string().trim().min(10, 'Message must be at least 10 characters')
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
