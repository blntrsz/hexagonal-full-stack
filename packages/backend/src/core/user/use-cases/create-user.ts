import { UserRepository } from "@backend/core/user/domain/repository/user.repository";
import { User, UserSchema } from "@backend/core/user/domain/user";

export type CreateUserRequest = Pick<UserSchema, 'email'>;

export class CreateUser {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async onRequest(request: CreateUserRequest): Promise<User> {
    try {
      const user = await this.userRepository.create(
        request.email,
      )

      return user
    } catch (e) {
      throw e
    }
  }
}
