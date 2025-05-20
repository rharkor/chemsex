import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"

import { UserController } from "./users/user.controller"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MICROSERVICES_CLIENTS } from "./constants"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICES_CLIENTS.USERS_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
          password: process.env.REDIS_PASS,
          username: process.env.REDIS_USER,
        },
      },
    ]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
