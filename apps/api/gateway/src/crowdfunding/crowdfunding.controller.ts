import { MICROSERVICES_CLIENTS } from "src/constants"

import { Body, Controller, Inject, Post } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Controller("crowdfunding")
export class CrowfundingController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.CROWDFUNDING_SERVICE)
    private readonly crowdfundingServiceClient: ClientProxy
  ) {}

  @Post("create_campaign")
  createCampaign(@Body() body: unknown) {
    return this.crowdfundingServiceClient.send("create_campaign", body)
  }
}