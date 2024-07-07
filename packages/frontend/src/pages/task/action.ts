import { ActionFunctionArgs } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { action } from '@frontend/features/remove-task'

export function taskAction(queryClient: QueryClient) {
  return async (args: ActionFunctionArgs) => {
    const result = await action(args, queryClient)

    if (result) {
      return result
    }
  }
}



