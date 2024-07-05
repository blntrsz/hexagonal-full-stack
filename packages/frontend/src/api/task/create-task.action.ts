import type { TaskSchema } from "@backend/core/task/domain/task";
import { client } from "@frontend/api/http";

export function createTaskAction(attributes: Pick<TaskSchema, 'description' | 'userId'>) {
  return client.tasks.$post({
    json: {
      userId: attributes.userId,
      description: attributes.description,
    }
  })
}
