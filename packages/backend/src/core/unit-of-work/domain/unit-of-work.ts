export interface UnitOfWork {
  createTransaction(operations: any[]): void
  commit(): Promise<void>
}
