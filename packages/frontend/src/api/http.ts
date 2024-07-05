import { hc } from "hono/client";
import type { AppType } from '@backend/api/app'

export const client = hc<AppType>('http://localhost:3000/')

