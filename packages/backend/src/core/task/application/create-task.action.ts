import { taskSchema } from "@backend/core/task/domain/task";
import { CreateTask } from "@backend/core/task/use-cases/create-task";
import { DrizzleTaskRepository } from "@backend/core/task/infrastructure/repository/drizzle/task.repository";
import { createFactory } from 'hono/factory'
import { zValidator } from '@hono/zod-validator'
import { taskDTO } from "./task.dto";

export const createTaskHandlers = createFactory().createHandlers(
  zValidator(
    'json',
    taskSchema.pick({
      description: true,
      userId: true,
    })
  ),
  async (c) => {
    try {
      const body = c.req.valid('json')
      const createTaskUseCase = new CreateTask(
        new DrizzleTaskRepository()
      )
      const task = await createTaskUseCase.onRequest(body)

      return c.json(taskDTO(task))
    } catch (e) {
      throw c.json({
        message: 'Internal Server Error'
      }, 500)
    }
  })

