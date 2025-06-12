import { JwtStrategy } from "jwtStrategy"

import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"

import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

const configService = new ConfigService()

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: configService.get("SECRET_KEY"),
      signOptions: { expiresIn: "6mon" },
    }),
  ],
  controllers: [UsersController],
  providers: [JwtStrategy, UsersService, ConfigService],
})
export class UsersModule {}
