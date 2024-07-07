import { StatusCode } from "hono/utils/http-status"
import { BadRequestError } from "./badrequest.error"
import { DomainError } from "./domain.error"
import { InfrastructureError } from "./infrastructure.error"
import { RecordNotFoundError } from "./recordnotfound.error"


export function toHttpError(e: unknown): {
  message: string,
  status: StatusCode
} {
  if (e instanceof InfrastructureError) {
    if (e instanceof RecordNotFoundError) {
      return {
        message: e.message,
        status: 404
      }
    }
  }

  if (e instanceof DomainError) {
    if (e instanceof BadRequestError) {
      return {
        message: e.message,
        status: 400
      }
    }
  }

  return {
    message: 'Internal Server Error',
    status: 500
  }
}
