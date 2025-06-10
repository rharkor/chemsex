import type { Request } from "express"
import { CreateCrowdfundingDto } from "src/dtos/createCrowdfundingDto"

import { Controller, Post, Req } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"

import { CrowdfundingService } from "./crowdfunding.service"

@Controller("crowdfunding")
export class CrowdfundingController {
  constructor(private readonly crowdfundingService: CrowdfundingService) {}

  @MessagePattern("create_campaign")
  @Post("create_campaign")
  createCampaign(@Payload() createCrowdfundingDto: CreateCrowdfundingDto, @Req() request: Request) {
    return this.crowdfundingService.createCrowdfunding(createCrowdfundingDto, request)
  }
}
