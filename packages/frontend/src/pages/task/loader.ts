import { getTaskByIdLoader } from '@frontend/api/task/get-task-by-id.loader'
import { QueryClient } from '@tanstack/react-query'
import { LoaderFunctionArgs } from 'react-router-dom'

export function taskLoader(queryClient: QueryClient) {
  return async ({ params }: LoaderFunctionArgs) => {
    await Promise.all([
      getTaskByIdLoader(queryClient, Number(params.id!))
    ])

    return {}
  }
}
