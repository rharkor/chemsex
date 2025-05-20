import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"

@Controller("users")
export class UserController {
  @MessagePattern("get_me")
  getMe() {
    return { id: "1", name: "John Doe" }
  }
}
