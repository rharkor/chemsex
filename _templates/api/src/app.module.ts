import { Module } from "@nestjs/common"

import { UserController } from "./users/user.controller"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
