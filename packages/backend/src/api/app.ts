import { User } from '@backend/core/user/domain/user'
import { Task } from '@backend/core/task/domain/task'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { user } from './routes/user'
import { task } from './routes/task'
// import { wait } from './wait'

export const app = new Hono()

app.use('/*', cors())
// app.use(async (_c, next) => {
//   await wait()
//   await next()
// })
app.use(async (c, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  c.res.headers.set('X-Response-Time', `${end - start}`)
})

const route = app
  .route(`/${User.type}`, user)
  .route(`/${Task.type}`, task)

export type AppType = typeof route
