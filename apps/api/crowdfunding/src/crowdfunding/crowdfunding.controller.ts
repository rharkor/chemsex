import type { Request } from "express"
import { MICROSERVICES_CLIENTS } from "src/constants"
import { CreateCrowdfundingDto } from "src/dtos/createCrowdfundingDto"

import { Controller, Get, Inject, Post } from "@nestjs/common"
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices"

import { CrowdfundingService } from "./crowdfunding.service"

@Controller("crowdfunding")
export class CrowdfundingController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.USERS_SERVICE)
    private readonly usersServiceClient: ClientProxy,
    private readonly crowdfundingService: CrowdfundingService
  ) { }

  @MessagePattern("create_campaign")
  @Post("create_campaign")
  createCampaign(@Payload() parameters: CreateCrowdfundingDto) {
    return this.crowdfundingService.createCrowdfunding(parameters)
  }

  @Get()
  @MessagePattern("get_all")
  getAll() {
    return "je suis une chips";
  }
}
