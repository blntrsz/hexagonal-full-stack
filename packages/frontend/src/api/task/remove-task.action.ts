import { client } from "@frontend/api/http";
import { QueryClient } from "@tanstack/react-query";
import { taskKeys } from "./keys";
import type { ListTasksResponse } from "./list-tasks.loader";

export async function removeTaskAction(id: string, queryClient: QueryClient) {
  queryClient.setQueryData<ListTasksResponse>(taskKeys.list(undefined), (old) => {
    return {
      ...old,
      data: old?.data?.filter(task => task.id !== Number(id)) ?? []
    }
  })
  const result = await client.tasks[":id"].$delete({
    param: {
      id,
    }
  })

  queryClient.invalidateQueries({ queryKey: taskKeys.lists() })

  return result
}

