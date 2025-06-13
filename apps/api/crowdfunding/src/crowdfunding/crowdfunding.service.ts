import { eq } from "drizzle-orm"
import { firstValueFrom } from "rxjs"
import { MICROSERVICES_CLIENTS } from "src/constants"
import { CreateCrowdfundingDto } from "src/dtos/createCrowdfundingDto"

import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { db } from "@party-n-play/db"
import { crowdfundingTable } from "@party-n-play/db/schemas/crowdfunding"

@Injectable()
export class CrowdfundingService {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.USERS_SERVICE)
    private readonly usersServiceClient: ClientProxy
  ) { }

  createCrowdfunding = async (parameters: CreateCrowdfundingDto) => {
    const userObservable = this.usersServiceClient.send("get_me", { token: parameters.ctx.token })
    const user = await firstValueFrom(userObservable)
    if (!user) {
      throw new UnauthorizedException("Utilisateur non authentifié")
    }

    const { goal, endDate, description, image, name } = parameters.data
    return db
      .insert(crowdfundingTable)
      .values({ goal, endDate: new Date(endDate), description, image, userId: user.id, name })
      .returning()
  }

  getAll() {
    return db.select().from(crowdfundingTable).limit(20)
  }

  getById(id: number) {
    return db.select().from(crowdfundingTable).where(eq(crowdfundingTable.id, id))
  }
}
