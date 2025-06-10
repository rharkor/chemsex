import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"

import { CrowfundingController } from "./crowdfunding/crowdfunding.controller"
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
      {
        name: MICROSERVICES_CLIENTS.CROWDFUNDING_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: ["nats://localhost:4222"],
        },
      },
    ]),
  ],
  controllers: [AppController, UserController, CrowfundingController],
  providers: [AppService],
})
export class AppModule {}
