import * as z from 'zod';

export const QuestionsSchema = z.object({
  title: z.string().min(2).max(150),
  explanation: z.string().min(5).max(500),
  tags: z.array(z.string().min(1).max(15)).min(0).max(5)
})