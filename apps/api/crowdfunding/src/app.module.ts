import { Module } from "@nestjs/common"

import { CrowdfundingModule } from "./crowdfunding/crowdfunding.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
  imports: [CrowdfundingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
