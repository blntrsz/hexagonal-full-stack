import { database } from "@backend/core/drizzle";
import { taskTable } from "./task.sql";
import { TaskRepository } from "@backend/core/task/domain/repository/task.repository";
import { Task, TaskSchema } from "@backend/core/task/domain/task";
import { eq, isNull } from "drizzle-orm";

export class DrizzleTaskRepository implements TaskRepository {
  async list(filter: {
    userId?: number
  }, trx = database): Promise<Task[]> {
    const query = trx.select().from(taskTable)

    if (filter.userId) {
      query.where(eq(taskTable.userId, filter.userId))
    }

    if (filter.userId === 0) {
      query.where(isNull(taskTable.userId))
    }

    const tasks = await query.execute()

    return tasks.map(task => new Task(task))
  }

  async create(task: Omit<TaskSchema, "id">, trx = database): Promise<Task> {
    const [result] = await trx.insert(taskTable).values(task).returning().execute()

    return new Task(result)
  }

  async byId(task: Pick<TaskSchema, "id">, trx = database): Promise<Task> {
    const [result] = await trx.select().from(taskTable).where(
      eq(taskTable.id, task.id)
    ).execute()

    return new Task(result)
  }
}

