import { client } from "@frontend/api/http";
import { QueryClient, useQuery } from '@tanstack/react-query'
import { taskKeys } from "./keys";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { SearchParams } from "@frontend/routes";

const CURRENT_USER_ID = 1

async function listTasks(userId?: number) {
  const response = await client.tasks.$get({
    query: {
      userId: userId?.toString(),
    }
  })
  const jsonResponse = await response.json()

  if (!response.ok || ('message' in jsonResponse)) {
    throw response
  }

  return jsonResponse
}

export type ListTasksResponse = Awaited<ReturnType<typeof listTasks>>

export const listTasksQuery = (userId?: number) => ({
  queryKey: taskKeys.list(userId!),
  queryFn: () => listTasks(userId),
})

export const listTasksLoader =
  (queryClient: QueryClient, userId?: number) =>
    queryClient.ensureQueryData(listTasksQuery(userId))

export function useTasksQuery() {
  const [searchParams] = useSearchParams()
  const { listTasksLoaderData: initialData } = useLoaderData() as { listTasksLoaderData: Awaited<ReturnType<typeof listTasks>> }
  const filter = searchParams.get(SearchParams.FILTER)

  const userId = filter === 'all' ? undefined : filter === 'unassigned' ? 0 : CURRENT_USER_ID

  return useQuery({
    ...listTasksQuery(userId),
    staleTime: Infinity,
    initialData,
  })
}

