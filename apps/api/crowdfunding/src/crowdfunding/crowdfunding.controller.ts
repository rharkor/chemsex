import { MICROSERVICES_CLIENTS } from "src/constants"
import { CreateCrowdfundingDto } from "src/dtos/createCrowdfundingDto"
import { GetByIdCrowdfundingDto } from "src/dtos/getByIdCrowdfunding"
import { GetCrowdfundingDto } from "src/dtos/getCrowdfunding"
import { UpdateCrowdfundingDto } from "src/dtos/updateCrowdfundingDto"

import { Controller, Delete, Get, Inject, Post } from "@nestjs/common"
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices"

import { CrowdfundingService } from "./crowdfunding.service"

@Controller("crowdfunding")
export class CrowdfundingController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.USERS_SERVICE)
    private readonly usersServiceClient: ClientProxy,
    private readonly crowdfundingService: CrowdfundingService
  ) {}

  @MessagePattern("create_campaign")
  @Post("create_campaign")
  createCampaign(@Payload() parameters: CreateCrowdfundingDto) {
    return this.crowdfundingService.createCrowdfunding(parameters)
  }

  @Get()
  @MessagePattern("get_all")
  getAll(@Payload() query: GetCrowdfundingDto) {
    const parseResult = GetCrowdfundingDto.parse(query)
    const cleaned = {
      goal: parseResult.goal ?? undefined,
      name: parseResult.name ?? undefined,
      userId: parseResult.userId ?? undefined,
      page: parseResult.page ?? 1,
    }
    return this.crowdfundingService.getAll(cleaned)
  }

  @Get(":id")
  @MessagePattern("get_by_id")
  getById(@Payload("id") id: GetByIdCrowdfundingDto) {
    const parseResult = GetByIdCrowdfundingDto.parse(id)
    return this.crowdfundingService.getById(parseResult)
  }

  @MessagePattern("update_crowdfunding")
  @Post("update_crowdfunding/:id")
  updateCrowdfunding(@Payload() parameters: UpdateCrowdfundingDto) {
    return this.crowdfundingService.updateCrowdfunding(parameters)
  }

  @Delete(":id")
  @MessagePattern("delete_by_id")
  deleteById(@Payload("id") id: GetByIdCrowdfundingDto) {
    const parseResult = GetByIdCrowdfundingDto.parse(id)
    return this.crowdfundingService.deleteById(parseResult)
  }
}
