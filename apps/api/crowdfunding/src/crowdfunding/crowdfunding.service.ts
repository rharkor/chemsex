import { eq } from "drizzle-orm"
import { Request } from "express"
import { CreateCrowdfundingDto } from "src/dtos/createCrowdfundingDto"

import { Injectable } from "@nestjs/common"
import { RpcException } from "@nestjs/microservices"
import { db } from "@party-n-play/db"



@Injectable()
export class CrowdfundingService {
  createCrowdfunding = (createCrowndfundingDto: CreateCrowdfundingDto, request: Request) => {
    //const { goal, endDate, name, description, image } = createCrowndfundingDto
    console.log(request);

    return {"oui": "non"}
  }
}
