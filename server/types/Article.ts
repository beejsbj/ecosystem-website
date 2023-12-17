import { z } from "zod";

const AuthorSchema = z.object({
  name: z.string().nonempty("Name is required"),
  bio: z.string().optional(),
});

const ArticleSchema = z.object({
  slug: z.string().nonempty("Slug is required"),
  title: z.string().nonempty("Title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  author: AuthorSchema,
  content: z.string().nonempty("Content is required"),
  cover: z.string().optional(),
  views: z.number().optional(),
  upvotes: z.number().optional(),
  category: z.string().nonempty("Category is required"),
  created_at: z.date().default(() => new Date()),
});

// Zod type for ArticleSchema
export type ArticleType = z.infer<typeof ArticleSchema>;
