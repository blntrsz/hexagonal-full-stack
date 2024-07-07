import type { TaskSchema } from "@backend/core/task/domain/task";
import { client } from "@frontend/api/http";
import { QueryClient } from "@tanstack/react-query";
import { taskKeys } from "./keys";

export async function createTaskAction(attributes: Pick<TaskSchema, 'description' | 'userId'>, queryClient: QueryClient) {
  queryClient.setQueryData<ListTasksResponse>(taskKeys.list(undefined), (old) => {
    return {
      ...old,
      data: [...old.data, {
        id: old.data.at(-1).id + 1,
        type: 'tasks',
        isCreating: true,
        attributes,
      }]
    }
  })
  const result = await client.tasks.$post({
    json: {
      userId: attributes.userId,
      description: attributes.description,
    }
  })

  queryClient.invalidateQueries({ queryKey: taskKeys.lists() })

  return result
}
