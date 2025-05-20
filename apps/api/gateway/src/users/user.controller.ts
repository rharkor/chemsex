import { MICROSERVICES_CLIENTS } from "src/constants"

import { Controller, Get, Inject } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Controller("users")
export class UserController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.USERS_SERVICE)
    private usersServiceClient: ClientProxy
  ) {}

  @Get()
  getMe() {
    return this.usersServiceClient.send("get_me", {})
  }
}
