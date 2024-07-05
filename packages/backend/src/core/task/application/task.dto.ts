import { Task } from "@backend/core/task/domain/task";

function taskMapper({ attributes: { id, ...attributes } }: Task) {
  return {
    id,
    type: Task.type,
    attributes: {
      userId: attributes.userId,
      description: attributes.description,
      done: attributes.done
    }
  }
}

export function taskDTO(task: Task) {
  return {
    data: taskMapper(task)
  }
}

export function tasksDTO(tasks: Task[]) {
  return {
    data: tasks.map(taskMapper)
  }
}
