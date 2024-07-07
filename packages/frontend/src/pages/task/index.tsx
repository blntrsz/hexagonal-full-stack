import { RemoveTask } from '@frontend/features/remove-task'
import { TaskTable } from '@frontend/features/task-table'

export function TaskPage() {
  return <div className='flex flex-col gap-8'>
    <TaskTable />
    <RemoveTask />
  </div>
}

