import { client } from "@frontend/api/http";
import { QueryClient, useQuery } from '@tanstack/react-query'
import { taskKeys } from "./keys";
import { useLoaderData, useParams } from "react-router-dom";

async function getTaskById(id: number) {
  const response = await client.tasks[":id"].$get({
    param: {
      id: id.toString(),
    }
  })
  const jsonResponse = await response.json()

  if (!response.ok || ('message' in jsonResponse)) {
    throw response
  }

  return jsonResponse
}

const getTaskByIdQuery = (id: number) => ({
  queryKey: taskKeys.detail(id),
  queryFn: () => getTaskById(id),
})

export const getTaskByIdLoader =
  (queryClient: QueryClient, id: number) =>
    queryClient.ensureQueryData(getTaskByIdQuery(id))

export function useTaskQuery() {
  const params = useParams()
  const id = Number(params.id)
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof getTaskByIdLoader>
  >

  return useQuery({
    ...getTaskByIdQuery(id),
    staleTime: Infinity,
    initialData,
  })
}

