import { Request } from "express"
import { MICROSERVICES_CLIENTS } from "src/constants"

import { Body, Controller, Get, Inject, Post, Req } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Controller("users")
export class UserController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.USERS_SERVICE)
    private readonly usersServiceClient: ClientProxy
  ) {}

  @Get("get_me")
  getMe(@Body() body: unknown, @Req() request: Request) {
    return this.usersServiceClient.send("get_me", { token: request.headers.authorization })
  }

  @Post("signup")
  signup(@Body() body: unknown) {
    return this.usersServiceClient.send("signup", body)
  }

  @Post("signin")
  signin(@Body() body: unknown) {
    return this.usersServiceClient.send("signin", body)
  }
}
