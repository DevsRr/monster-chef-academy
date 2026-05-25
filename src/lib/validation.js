import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(80),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters.").max(120),
  message: z.string().min(20, "Message must be at least 20 characters.").max(1200),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes only."),
  summary: z.string().min(20, "Summary must be at least 20 characters.").max(220),
  description: z.string().min(60, "Description must be at least 60 characters."),
  image: z.string().url("Please provide a valid image URL."),
  technologies: z.string().min(2, "Add at least one technology."),
  liveUrl: z.string().url("Provide a valid live project URL."),
  repoUrl: z.string().url("Provide a valid repository URL."),
  featured: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email("Valid email required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
