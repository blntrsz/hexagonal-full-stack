import { useTaskQuery } from "@frontend/api/task/get-task-by-id.loader"

export function TaskTable() {
  const taskQuery = useTaskQuery()

  return <table className="table-fixed text-left w-full">
    <tbody>
      <tr>
        <th>ID</th>
        <td>{taskQuery.data.data.id}</td>
      </tr>
      <tr>
        <th>Assigned User</th>
        <td>{taskQuery.data.data.attributes.userId}</td>
      </tr>
      <tr>
        <th>Description</th>
        <td>{taskQuery.data.data.attributes.description}</td>
      </tr>
      <tr>
        <th>Done</th>
        <td>{taskQuery.data.data.attributes.done ? 'Y' : 'N'}</td>
      </tr>
    </tbody>
  </table>
}
