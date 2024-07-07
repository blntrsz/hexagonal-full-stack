import { Logger } from "@backend/core/logger/domain/logger";

export class ConsoleLogger implements Logger {
  debug(...data: any[]): void {
    console.debug(data)
  }

  info(...data: any[]): void {
    console.debug(data)
  }

  warn(...data: any[]): void {
    console.debug(data)
  }

  error(...data: any[]): void {
    console.debug(data)
  }
}
