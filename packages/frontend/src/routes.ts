export const Routes = {
  home: '/',
  task: (id: string) => `/${id}` as const
} as const

export enum SearchParams {
  FILTER = 'filter',
  IS_CREATING = 'is-creating'
}
