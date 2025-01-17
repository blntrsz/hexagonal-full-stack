import { Logger } from "@backend/core/logger/domain/logger";
import { TaskRepository } from "@backend/core/task/domain/repository/task.repository";
import { Task, TaskSchema } from "@backend/core/task/domain/task";

export type GetTaskByIdRequest = Pick<TaskSchema, 'id'>;

export class GetTaskById {
  constructor(
    private readonly logger: Logger,
    private readonly taskRepository: TaskRepository,
  ) { }

  async onRequest(request: GetTaskByIdRequest): Promise<Task> {
    try {
      return this.taskRepository.byId(request)
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}

