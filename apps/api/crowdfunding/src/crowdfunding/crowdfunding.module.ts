import { MICROSERVICES_CLIENTS } from "src/constants"

import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"

import { CrowdfundingController } from "./crowdfunding.controller"
import { CrowdfundingService } from "./crowdfunding.service"

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
  controllers: [CrowdfundingController],
  providers: [CrowdfundingService],
})
export class CrowdfundingModule {}
