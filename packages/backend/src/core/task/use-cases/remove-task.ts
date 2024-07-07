import { Logger } from "@backend/core/logger/domain/logger";
import { TaskRepository } from "@backend/core/task/domain/repository/task.repository";
import { TaskSchema } from "@backend/core/task/domain/task";

export type RemoveTaskRequest = Pick<TaskSchema, 'id'>;

export class RemoveTask {
  constructor(
    private readonly logger: Logger,
    private readonly taskRepository: TaskRepository,
  ) { }

  async onRequest(request: RemoveTaskRequest): Promise<void> {
    try {
      await this.taskRepository.remove(request)
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}


