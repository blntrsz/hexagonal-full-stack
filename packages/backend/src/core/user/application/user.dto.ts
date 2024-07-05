import { User } from "../domain/user";

function userMapper({ attributes: { id, ...attributes } }: User) {
  return {
    id,
    type: User.type,
    attributes: {
      email: attributes.email,
    }
  }
}

export function userDTO(user: User) {
  return {
    data: userMapper(user)
  }
}

export function usersDTO(users: User[]) {
  return {
    data: users.map(userMapper)
  }
}
