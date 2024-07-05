import { TaskRepository } from "@backend/core/task/domain/repository/task.repository";
import { Task, TaskSchema } from "@backend/core/task/domain/task";

export type CreateTaskRequest = Pick<TaskSchema, 'userId' | 'description'>;

export class CreateTask {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }

  async onRequest(request: CreateTaskRequest): Promise<Task> {
    try {
      const task = await this.taskRepository.create(
        request,
      )

      return task
    } catch (e) {
      throw e
    }
  }
}

