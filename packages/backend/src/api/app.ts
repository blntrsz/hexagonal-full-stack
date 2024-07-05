import { User } from '@backend/core/user/domain/user'
import { Task } from '@backend/core/task/domain/task'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { user } from './routes/user'
import { task } from './routes/task'

export const app = new Hono()

app.use('/*', cors())

const route = app
  .route(`/${User.type}`, user)
  .route(`/${Task.type}`, task)

export type AppType = typeof route
