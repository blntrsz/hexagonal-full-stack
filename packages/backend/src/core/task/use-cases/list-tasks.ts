import { Logger } from "@backend/core/logger/domain/logger";
import { TaskRepository } from "@backend/core/task/domain/repository/task.repository";
import { Task } from "@backend/core/task/domain/task";

type ListTasksRequest = {
  userId?: number
}

export class ListTasks {
  constructor(
    private readonly logger: Logger,
    private readonly taskRepository: TaskRepository,
  ) { }

  async onRequest(request: ListTasksRequest): Promise<Task[]> {
    try {
      return this.taskRepository.list(request)
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}


