import { eq } from "drizzle-orm"
import { Request } from "express"
import { CreateCrowdfundingDto } from "src/dtos/createCrowdfundingDto"

import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"




@Injectable()
export class CrowdfundingService {
  constructor(private readonly usersServiceClient: ClientProxy) { }
  createCrowdfunding = async (parameters: CreateCrowdfundingDto) => {
    const user = await this.usersServiceClient.send('getMe', { token: parameters.ctx.token })
    if (!user) {
      throw new UnauthorizedException("Utilisateur non authentifié")
    }
    console.log(parameters);

    return { success: true }
  }
}
