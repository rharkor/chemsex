import * as bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { LoginUserDto } from "src/dtos/loginUserDto"
import { CreateUserDto } from "src/dtos/singupUserDto"

import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { RpcException } from "@nestjs/microservices"
import { db } from "@party-n-play/db"
import { userTable } from "@party-n-play/db/schemas/user"

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async signup(createUserDto: CreateUserDto): Promise<Record<string, string>> {
    const { email, password, username } = createUserDto

    const user = await db.select().from(userTable).where(eq(userTable.email, email))

    if (user.length > 0) throw new RpcException("User already exists !")

    const hash = await bcrypt.hash(password, 10)

    await db.insert(userTable).values({ email, password: hash, username })

    return { data: "User successfully created" }
  }

  async signin(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto

    const user = await db.select().from(userTable).where(eq(userTable.email, email))

    if (!user) {
      throw new NotFoundException("User not found")
    }

    const match = await bcrypt.compare(password, user[0].password)

    if (!match) {
      throw new UnauthorizedException("Credentials are not good")
    }

    const userToken = {
      id: user[0].id,
      username: user[0].username,
      email: user[0].email,
    }

    const userStorage = { ...userToken }

    const token = this.jwtService.sign(userToken, {
      expiresIn: "2h",
      secret: this.configService.get("SECRET_KEY"),
    })

    return {
      token,
      userStorage,
    }
  }
}
