import { DrizzleUserRepository } from "@backend/core/user/infrasructure/repository/drizzle/user.repository";
import { GetUserById } from "@backend/core/user/use-cases/get-user-by-id";
import { DomainError } from "@backend/core/error/domain.error";
import { createFactory } from 'hono/factory'
import { zValidator } from '@hono/zod-validator'
import { z } from "zod";
import { userDTO } from "./user.dto";

export const getUserByIdHandlers = createFactory().createHandlers(
  zValidator(
    'param',
    z.object({
      id: z.coerce.number()
    })
  ),
  async (c) => {
    try {
      const param = c.req.valid('param')
      const createUserUseCase = new GetUserById(
        new DrizzleUserRepository()
      )
      const user = await createUserUseCase.onRequest(param)

      return c.json(userDTO(user))
    } catch (e) {
      if (e instanceof DomainError) {
        return c.json({
          message: 'Domain error'
        })
      }

      return c.json({
        message: 'Internal Server Error'
      }, 500)
    }
  })


