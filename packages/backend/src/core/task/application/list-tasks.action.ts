import { DrizzleTaskRepository } from "@backend/core/task/infrastructure/repository/drizzle/task.repository";
import { createFactory } from 'hono/factory'
import { ListTasks } from "@backend/core/task/use-cases/list-tasks";
import { tasksDTO } from "./task.dto";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { ConsoleLogger } from "@backend/core/logger/infrastructure/console-logger";
import { toHttpError } from "@backend/core/error/to-http.error";

export const listTasksHandlers = createFactory().createHandlers(
  zValidator(
    'query',
    z.object({
      userId: z.coerce.number().optional()
    })
  ),
  async (c) => {
    const query = c.req.valid('query')
    try {
      const createTaskUseCase = new ListTasks(
        new ConsoleLogger(),
        new DrizzleTaskRepository()
      )
      const tasks = await createTaskUseCase.onRequest({
        userId: query.userId
      })

      return c.json(tasksDTO(tasks))
    } catch (e) {
      const httpError = toHttpError(e)

      return c.json({
        message: httpError.message
      }, httpError.status)
    }
  })
