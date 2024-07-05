import { DrizzleTaskRepository } from "@backend/core/task/infrastructure/repository/drizzle/task.repository";
import { createFactory } from 'hono/factory'
import { ListTasks } from "@backend/core/task/use-cases/list-tasks";
import { tasksDTO } from "./task.dto";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const listTasksHandlers = createFactory().createHandlers(
  zValidator(
    'query',
    z.object({
      userId: z.number().optional()
    })
  ),
  async (c) => {
    const query = c.req.valid('query')
    try {
      const createTaskUseCase = new ListTasks(
        new DrizzleTaskRepository()
      )
      const tasks = await createTaskUseCase.onRequest({
        userId: query.userId
      })

      return c.json(tasksDTO(tasks))
    } catch (e) {
      throw c.json({
        message: 'Internal Server Error'
      }, 500)
    }
  })
