import { UserRepository } from "@backend/core/user/domain/repository/user.repository";
import { database } from "@backend/core/drizzle";
import { User } from "@backend/core/user/domain/user";
import { userTable } from "./user.sql";
import { eq } from "drizzle-orm";

export class DrizzleUserRepository implements UserRepository {
  async getById(id: number, trx = database): Promise<User> {
    const [userProperties] = await trx.select().from(userTable).where(
      eq(userTable.id, id)
    ).execute()

    return new User(userProperties)
  }

  async create(email: string, trx = database): Promise<User> {
    const [userProperties] = await trx.insert(userTable).values({
      email,
    }).returning().execute()

    return new User(userProperties)
  }

  async getByEmail(email: string, trx = database): Promise<User> {
    const [userProperties] = await trx.select().from(userTable).where(
      eq(userTable.email, email)
    ).execute()

    return new User(userProperties)
  }
}
