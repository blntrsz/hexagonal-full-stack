import { useRef } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { z } from 'zod'

export const FilterTypes = z.enum(['all', 'assigned-to-me', 'unassigned'])

export function TaskFilter() {
  const ref = useRef<HTMLFormElement>(null)
  const [searchParams] = useSearchParams()

  function onSelect() {
    ref.current?.submit()
  }

  return <Form ref={ref}>
    <select defaultValue={searchParams.get('filter')!} onChange={onSelect} name="filter" id="task-filter">
      <option value={FilterTypes.Values.all}>All</option>
      <option value={FilterTypes.Values["assigned-to-me"]}>Assigned to me</option>
      <option value={FilterTypes.Values.unassigned}>Unassigned</option>
    </select>
  </Form>
}
