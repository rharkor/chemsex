import { Request } from "express"
import { MICROSERVICES_CLIENTS } from "src/constants"

import { Body, Controller, Get, Inject, Param, Post, Req } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Controller("crowdfunding")
export class CrowfundingController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.CROWDFUNDING_SERVICE)
    private readonly crowdfundingServiceClient: ClientProxy
  ) { }

  @Post("create_campaign")
  createCampaign(@Body() body: unknown, @Req() request: Request) {
    return this.crowdfundingServiceClient.send("create_campaign", {
      data: body,
      ctx: { token: request.headers.authorization },
    })
  }

  @Get()
  getAll() {
    return this.crowdfundingServiceClient.send("get_all", {})
  }

  @Get(':id')
  getById(@Param("id") id: number) {
    return this.crowdfundingServiceClient.send("get_by_id", { id })
  }
}
