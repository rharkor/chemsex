import { config } from "dotenv"
config()
import { NestFactory } from "@nestjs/core"
import { type MicroserviceOptions, Transport } from "@nestjs/microservices"

import { AppModule } from "./app.module"

/**
 *
 */
async function bootstrap() {
  if (!process.env.REDIS_PORT) {
    throw new Error("REDIS_PORT environment variable is required")
  }
  if (!process.env.REDIS_HOST) {
    throw new Error("REDIS_HOST environment variable is required")
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
      password: process.env.REDIS_PASS,
      username: process.env.REDIS_USER,
    },
  })
  await app.listen()
  console.log(`Microservice is running`)
}
void bootstrap()
