import { config } from "dotenv"
config()
import { NestFactory } from "@nestjs/core"
import { type MicroserviceOptions, Transport } from "@nestjs/microservices"

import { AppModule } from "./app.module"

/**
 *
 */
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: ["nats://localhost:4222"],
    },
  })

  await app.listen()
  console.log(`Microservice is running`)
}
void bootstrap()
