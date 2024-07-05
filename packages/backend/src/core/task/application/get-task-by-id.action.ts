import { DrizzleTaskRepository } from "@backend/core/task/infrastructure/repository/drizzle/task.repository";
import { createFactory } from 'hono/factory'
import { GetTaskById } from "../use-cases/get-task-by-id";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { taskDTO } from "./task.dto";

export const getTaskByIdHandlers = createFactory().createHandlers(
  zValidator(
    'param',
    z.object({
      id: z.coerce.number()
    })
  ),
  async (c) => {
    const param = c.req.valid('param')
    try {
      const createTaskUseCase = new GetTaskById(
        new DrizzleTaskRepository()
      )
      const task = await createTaskUseCase.onRequest(param)

      return c.json(taskDTO(task))
    } catch (e) {
      throw c.json({
        message: 'Internal Server Error'
      }, 500)
    }
  })
