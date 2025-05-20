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
        transport: Transport.NATS,
        options: {
          servers: ["nats://localhost:4222"],
        },
      },
    ]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
