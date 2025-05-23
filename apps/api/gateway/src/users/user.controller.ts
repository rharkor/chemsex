import { MICROSERVICES_CLIENTS } from "src/constants"

import { Body, Controller, Get, Inject, Post } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Controller("users")
export class UserController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.USERS_SERVICE)
    private readonly usersServiceClient: ClientProxy
  ) {}

  @Get()
  getMe() {
    return this.usersServiceClient.send("get_me", {})
  }

  @Post("signup")
  signup(@Body() body: unknown) {
    return this.usersServiceClient.send("signup", body)
  }
}
