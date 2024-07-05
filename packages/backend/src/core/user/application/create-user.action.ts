import { userSchema } from "@backend/core/user/domain/user";
import { CreateUser } from "@backend/core/user/use-cases/create-user";
import { DrizzleUserRepository } from "@backend/core/user/infrasructure/repository/drizzle/user.repository";
import { createFactory } from 'hono/factory'
import { zValidator } from '@hono/zod-validator'
import { userDTO } from "./user.dto";

export const createUserHandlers = createFactory().createHandlers(
  zValidator(
    'json',
    userSchema.omit({
      id: true
    })
  ),
  async (c) => {
    try {
      const body = c.req.valid('json')
      const createUserUseCase = new CreateUser(
        new DrizzleUserRepository()
      )
      const user = await createUserUseCase.onRequest(body)

      return c.json(userDTO(user))
    } catch (e) {
      return c.json({
        message: 'Internal Server Error'
      }, 500)
    }
  })

