import { z } from "zod";

export const noteInputSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  text: z.string().min(1).max(2000).trim(),
});
