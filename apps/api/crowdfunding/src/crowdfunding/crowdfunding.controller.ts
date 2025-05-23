import { Controller, Post } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"

@Controller("crowdfunding")
export class CrowdfundingController {
  @MessagePattern("create_campaign")
  @Post("create_campaign")
  async Create_campaign(@Payload() ) {
    return { id: "1", name: "John Doe" }
  }
}
