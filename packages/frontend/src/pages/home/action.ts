import { ActionFunctionArgs } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { action } from '@frontend/features/create-task'

export function homeAction(queryClient: QueryClient) {
  return async (args: ActionFunctionArgs) => {
    const result = action(args, queryClient)

    if (result) {
      return result
    }
  }
}


