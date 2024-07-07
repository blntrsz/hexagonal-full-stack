import { DrizzleTaskRepository } from "@backend/core/task/infrastructure/repository/drizzle/task.repository";
import { createFactory } from 'hono/factory'
import { RemoveTask } from "@backend/core/task/use-cases/remove-task";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { ConsoleLogger } from "@backend/core/logger/infrastructure/console-logger";
import { toHttpError } from "@backend/core/error/to-http.error";

export const removeTaskHandlers = createFactory().createHandlers(
  zValidator(
    'param',
    z.object({
      id: z.coerce.number()
    })
  ),
  async (c) => {
    const param = c.req.valid('param')
    try {
      const createTaskUseCase = new RemoveTask(
        new ConsoleLogger(),
        new DrizzleTaskRepository()
      )

      await createTaskUseCase.onRequest(param)

      return c.json({
        message: 'success'
      })
    } catch (e) {
      const httpError = toHttpError(e)

      return c.json({
        message: httpError.message
      }, httpError.status)
    }
  })

