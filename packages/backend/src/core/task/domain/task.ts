import { z } from 'zod'

export const taskSchema = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  description: z.string(),
  done: z.boolean().default(false),
})
export type TaskSchema = z.infer<typeof taskSchema>

export class Task {
  public constructor(
    public readonly attributes: z.infer<typeof taskSchema>,
  ) { }

  static type = 'tasks' as const
}

