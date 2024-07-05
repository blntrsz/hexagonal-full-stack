import { TaskRepository } from "@backend/core/task/domain/repository/task.repository";
import { Task, TaskSchema } from "@backend/core/task/domain/task";

export type GetTaskByIdRequest = Pick<TaskSchema, 'id'>;

export class GetTaskById {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }

  async onRequest(request: GetTaskByIdRequest): Promise<Task> {
    try {
      const task = await this.taskRepository.byId(request)

      return task
    } catch (e) {
      throw e
    }
  }
}

