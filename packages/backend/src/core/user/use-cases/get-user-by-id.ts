import { UserRepository } from "@backend/core/user/domain/repository/user.repository";
import { User, UserSchema } from "@backend/core/user/domain/user";

export type GetUserByIdRequest = Pick<UserSchema, 'id'>;

export class GetUserById {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async onRequest(request: GetUserByIdRequest): Promise<User> {
    try {
      const user = await this.userRepository.getById(
        request.id,
      )

      return user
    } catch (e) {
      throw e
    }
  }
}

