import { Task, TaskSchema } from "@backend/core/task/domain/task";

export interface TaskRepository {
  list(filter: {
    userId?: number
  }, trx?: any): Promise<Task[]>,
  create(task: Omit<TaskSchema, 'id' | 'done'>, trx?: any): Promise<Task>
  byId(task: Pick<TaskSchema, 'id'>, trx?: any): Promise<Task>
  remove(task: Pick<TaskSchema, 'id'>, trx?: any): Promise<void>
}

