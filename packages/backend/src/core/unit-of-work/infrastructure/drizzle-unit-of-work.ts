import { database } from "@backend/core/drizzle";
import { UnitOfWork } from "@backend/core/unit-of-work/domain/unit-of-work";

export class DrizzleUnitOfWork implements UnitOfWork {
  private operations: any[] = [];

  createTransaction(operations: any[]): void {
    this.operations = operations;
  }

  async commit() {
    try {
      database.transaction(async (tx) => {
        for (const operation of this.operations) {
          await operation.fn(operation.params, tx);
        }
      });
    } catch (error) {
      throw new Error('error');
    }
  }
}
