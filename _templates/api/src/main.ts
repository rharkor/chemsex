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
      servers: ['nats://localhost:4222'],
    },
  })
  
  let regexResult: string | undefined;
  const regex = __dirname.match(/\/apps\/api\/([^\/]+)/)
  if (regex) {
    regexResult = regex[1];
  }

  await app.listen()
  console.log(`${regexResult || 'unknown'} microservice is running`)
}
void bootstrap()
