import { SearchParams } from "@frontend/routes";
import { useNavigation, useSearchParams } from "react-router-dom";
import { z } from 'zod'

export const FilterTypes = z.enum(['all', 'assigned-to-me', 'unassigned'])

export function TaskFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigation = useNavigation()

  function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams((prev) => {
      prev.set(SearchParams.FILTER, e.target.value)
      return prev
    })
  }

  return <select disabled={navigation.state === 'loading'} defaultValue={searchParams.get(SearchParams.FILTER)!} onChange={onSelect} name="filter" id="task-filter" className="disabled:text-gray-400">
    <option value={FilterTypes.Values.all}>All</option>
    <option value={FilterTypes.Values["assigned-to-me"]}>Assigned to me</option>
    <option value={FilterTypes.Values.unassigned}>Unassigned</option>
  </select>
}
