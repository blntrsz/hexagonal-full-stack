import { User, UserSchema } from "@backend/core/user/domain/user";

export interface UserRepository {
  getById(id: UserSchema['id'], trx?: any): Promise<User>;
  getByEmail(email: UserSchema['email'], trx?: any): Promise<User>;
  create(email: UserSchema['email'], trx?: any): Promise<User>
}
