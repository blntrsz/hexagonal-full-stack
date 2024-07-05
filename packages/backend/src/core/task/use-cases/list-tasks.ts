import { TaskRepository } from "@backend/core/task/domain/repository/task.repository";
import { Task } from "@backend/core/task/domain/task";

type ListTasksRequest = {
  userId?: number
}

export class ListTasks {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }

  async onRequest(request: ListTasksRequest): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.list(request)

      return tasks
    } catch (e) {
      throw e
    }
  }
}


