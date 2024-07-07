import { removeTaskAction } from "@frontend/api/task/remove-task.action"
import { QueryClient } from "@tanstack/react-query"
import { ActionFunctionArgs, Form, redirect, useNavigation } from "react-router-dom"

const formNames = {
  actionName: '_action',
  actionValue: 'remove-task'
}

export async function action({ request, params }: ActionFunctionArgs, queryClient: QueryClient) {
  const id = params.id!
  const formData = await request.formData()

  const action = formData.get(formNames.actionName)

  if (action) {
    await removeTaskAction(id, queryClient)
    return redirect("/")
  }
}

export function RemoveTask() {
  const navigation = useNavigation()
  return <Form method="DELETE">
    <input readOnly hidden name={formNames.actionName} value={formNames.actionValue} />
    <button disabled={navigation.state === "submitting"} className="px-4 py-2 bg-red-500 rounded-xl text-white disabled:bg-red-200" type="submit">Delete</button>
  </Form>
}
