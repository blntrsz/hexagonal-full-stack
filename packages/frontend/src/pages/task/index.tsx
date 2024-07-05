import { useTaskQuery } from '@frontend/api/task/get-task-by-id.loader'

export function TaskPage() {
  const taskQuery = useTaskQuery()

  return <>
    <div>{taskQuery.data.data.attributes.description}</div>
  </>
}

