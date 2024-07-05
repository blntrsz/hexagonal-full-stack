import { createUserHandlers } from "@backend/core/user/application/create-user.action";
import { getUserByIdHandlers } from "@backend/core/user/application/get-user-by-id.action";
import { Hono } from "hono";

export const user = new Hono()
  .post("/", ...createUserHandlers)
  .get("/:id", ...getUserByIdHandlers)

