import { CreateUserDto } from "src/dtos/singupUserDto"

import { Controller, Post } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"

import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern("get_me")
  getMe() {
    return { id: "1", name: "John Doe" }
  }

  @MessagePattern("signup")
  @Post("signup")
  async signup(@Payload() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto)
  }
}
