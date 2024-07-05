import { listTasksLoader } from '@frontend/api/task/list-tasks.loader'
import { SearchParams } from '@frontend/routes'
import { json, LoaderFunctionArgs, redirect } from 'react-router-dom'
import { FilterTypes } from '@frontend/features/task-filter'
import { QueryClient } from '@tanstack/react-query'

const CURRENT_USER_ID = 1

export function homeLoader(queryClient: QueryClient) {
  return async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const filterResult = FilterTypes.safeParse(url.searchParams.get(SearchParams.FILTER))

    if (!filterResult.success) {
      const url = new URL(request.url)
      url.searchParams.set(SearchParams.FILTER, FilterTypes.Values.all)

      return redirect(url.toString())
    }

    const filter = filterResult.data
    const userId = filter === 'all' ? undefined : filter === 'unassigned' ? 0 : CURRENT_USER_ID

    const [listTasksLoaderData] = await Promise.all([
      listTasksLoader(queryClient, userId)
    ])

    return json({
      listTasksLoaderData
    })
  }
}

