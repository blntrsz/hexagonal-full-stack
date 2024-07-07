import { Logger } from "@backend/core/logger/domain/logger";
import { TaskRepository } from "@backend/core/task/domain/repository/task.repository";
import { Task, TaskSchema } from "@backend/core/task/domain/task";

export type CreateTaskRequest = Pick<TaskSchema, 'userId' | 'description'>;

export class CreateTask {
  constructor(
    private readonly logger: Logger,
    private readonly taskRepository: TaskRepository,
  ) { }

  async onRequest(request: CreateTaskRequest): Promise<Task> {
    try {
      return this.taskRepository.create(
        request,
      )
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}

