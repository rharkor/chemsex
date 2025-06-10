import { Module } from "@nestjs/common"

import { CrowdfundingController } from "./crowdfunding.controller";
import { CrowdfundingService } from "./crowdfunding.service";


@Module({
  imports: [],
  controllers: [CrowdfundingController],
  providers: [CrowdfundingService],
})
export class CrowdfundingModule {}
