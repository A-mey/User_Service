/* eslint-disable no-unused-vars */
export interface SimpleConsumer {
    connect(): Promise<void>;
    handle(message: unknown): Promise<void>
    disconnect(): Promise<void>;
  }