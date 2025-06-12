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

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .then((response) => response.at(0))

    if (!user) {
      throw new NotFoundException("User not found")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw new UnauthorizedException("Credentials are not good")
    }

    const userToken = {
      id: user.id,
      username: user.username,
      email: user.email,
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

  async getMe(data: {
    token: string | null | undefined
  }): Promise<Omit<typeof userTable.$inferSelect, "password"> | null | undefined> {
    if (!data.token) {
      throw new RpcException("No token provided")
    }

    const token = data.token.startsWith("Bearer ") ? data.token.slice(7) : null

    if (!token) {
      throw new RpcException("Invalid token format")
    }

    const userToken = this.jwtService.decode(token)

    return db
      .select({
        id: userTable.id,
        email: userTable.email,
        username: userTable.username,
      })
      .from(userTable)
      .where(eq(userTable.id, userToken.id))
      .then((response) => response.at(0))
  }
}
