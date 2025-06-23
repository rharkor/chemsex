import { Request } from "express"
import { MICROSERVICES_CLIENTS } from "src/constants"

import { Body, Controller, Delete, Get, Inject, Param, Post, Query, Req } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Controller("crowdfunding")
export class CrowfundingController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.CROWDFUNDING_SERVICE)
    private readonly crowdfundingServiceClient: ClientProxy
  ) {}

  @Post("create_campaign")
  createCampaign(@Body() body: unknown, @Req() request: Request) {
    return this.crowdfundingServiceClient.send("create_campaign", {
      data: body,
      ctx: { token: request.headers.authorization },
    })
  }

  @Get()
  getAll(@Query() query) {
    return this.crowdfundingServiceClient.send("get_all", query)
  }

  @Get(":id")
  getById(@Param("id") id: number) {
    return this.crowdfundingServiceClient.send("get_by_id", { id })
  }

  @Post("update_crowdfunding/:id")
  updateCrowdfunding(@Param("id") id: number, @Body() body: unknown, @Req() request: Request) {
    return this.crowdfundingServiceClient.send("update_crowdfunding", {
      id,
      data: body,
      ctx: { token: request.headers.authorization },
    })
  }

  @Delete(":id")
  deleteById(@Param("id") id: number) {
    return this.crowdfundingServiceClient.send("delete_by_id", { id })
  }
}
