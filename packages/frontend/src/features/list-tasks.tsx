import { Link } from "react-router-dom"
import { useTasksQuery } from '@frontend/api/task/list-tasks.loader'

export function ListTasks() {
  const tasksQuery = useTasksQuery()

  return <ul className="">{
    tasksQuery.data.data.map(task => (
      <li key={task.id}>
        <Link to={`/${task.id}`}>{task.attributes.description}</Link>
      </li>
    ))
  }</ul>
}
