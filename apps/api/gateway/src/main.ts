import { config } from "dotenv"
config()

import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"

/**
 *
 */
async function bootstrap() {
  if (!process.env.PORT) {
    throw new Error("PORT environment variable is required")
  }

  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
