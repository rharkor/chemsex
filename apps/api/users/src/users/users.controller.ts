import { type Request } from "express"
import { type LoginUserDto } from "src/dtos/loginUserDto"
import { type CreateUserDto } from "src/dtos/singupUserDto"

import { Controller, Post } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"

import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern("get_me")
  async getMe(@Payload() data: { token: string | null | undefined }) {
    return this.userService.getMe(data)
  }

  @MessagePattern("signup")
  @Post("signup")
  async signup(@Payload() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto)
  }

  @MessagePattern("signin")
  @Post("signin")
  signin(@Payload() loginUserDto: LoginUserDto) {
    return this.userService.signin(loginUserDto)
  }
}
