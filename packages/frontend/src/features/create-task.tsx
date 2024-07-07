import { createTaskAction } from "@frontend/api/task/create-task.action"
import { SearchParams } from "@frontend/routes"
import { QueryClient } from "@tanstack/react-query"
import { ActionFunctionArgs, Form, redirect, useNavigation, useSearchParams } from "react-router-dom"

const formNames = {
  description: 'description',
  actionName: '_action',
  actionValue: 'create-task'
}

export async function action({ request }: ActionFunctionArgs, queryClient: QueryClient) {
  const formData = await request.formData()
  const url = new URL(request.url)

  const description = formData.get('description') as string
  const action = formData.get(formNames.actionName) as string

  if (action) {
    await createTaskAction({
      description,
      userId: null
    }, queryClient)

    url.searchParams.delete(SearchParams.IS_CREATING)

    return redirect(url.toString())
  }
}

export function CreateTask() {
  const [searchParams, setSearchParams] = useSearchParams()
  const isCreating = !!searchParams.get(SearchParams.IS_CREATING)
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  function switchCreatingMode() {
    setSearchParams((prev) => {
      if (isCreating) {
        prev.delete(SearchParams.IS_CREATING)
      } else {
        prev.set(SearchParams.IS_CREATING, 'true');
      }
      return prev;
    })
  }

  return <>
    {!isCreating && <button className="py-2 px-4 bg-gray-600 text-white rounded-xl" onClick={switchCreatingMode}>
      Add New
    </button>}
    {isCreating && (
      <Form method="POST" className="flex flex-col gap-4">
        <input className="w-full px-4 py-2 border-black border-wi" name={formNames.description} placeholder="Create..." />
        <input readOnly hidden name={formNames.actionName} value={formNames.actionValue} />
        <div className="flex gap-8 justify-center">
          <button disabled={isSubmitting} className="py-2 px-4 bg-gray-600 disabled:bg-gray-400 text-white rounded-xl" onClick={switchCreatingMode}>Cancel</button>
          <button disabled={isSubmitting} className="py-2 px-4 bg-blue-600 disabled:bg-blue-400 text-white rounded-xl" type="submit">Create</button>
        </div>
      </Form>
    )}
  </>
}

