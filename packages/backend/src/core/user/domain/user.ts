import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email()
})
export type UserSchema = z.infer<typeof userSchema>

export class User {
  public constructor(
    public readonly attributes: z.infer<typeof userSchema>,
  ) { }

  static type = 'users' as const
}
