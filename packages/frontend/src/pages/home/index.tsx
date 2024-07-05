import { ListTasks } from "@frontend/features/list-tasks"
import { TaskFilter } from "@frontend/features/task-filter"

export function HomePage() {
  return <div className="flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl">Todos</h1>
      <TaskFilter />
    </div>
    <ListTasks />
  </div>
}
