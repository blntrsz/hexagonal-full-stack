import { createTaskHandlers } from "@backend/core/task/application/create-task.action";
import { getTaskByIdHandlers } from "@backend/core/task/application/get-task-by-id.action";
import { listTasksHandlers } from "@backend/core/task/application/list-tasks.action";
import { removeTaskHandlers } from "@backend/core/task/application/remove-task.action";
import { Hono } from "hono";

export const task = new Hono()
  .post("/", ...createTaskHandlers)
  .get("/", ...listTasksHandlers)
  .get("/:id", ...getTaskByIdHandlers)
  .delete("/:id", ...removeTaskHandlers)
