import { Module } from "@nestjs/common"

import { crowdfundingController } from "./crowdfunding/crowdfunding.controller"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
  imports: [],
  controllers: [AppController, crowdfundingController],
  providers: [AppService],
})
export class AppModule {}
