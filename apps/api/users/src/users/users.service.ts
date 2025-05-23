import * as bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { CreateUserDto } from "src/dtos/singupUserDto"

import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { RpcException } from "@nestjs/microservices"
import { db } from "@party-n-play/db"
import { userTable } from "@party-n-play/db/schemas/user"

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}
  async signup(createUserDto: CreateUserDto): Promise<Record<string, string>> {
    const { email, password, username } = createUserDto

    const user = await db.select().from(userTable).where(eq(userTable.email, email))

    if (user.length > 0) throw new RpcException("User already exists !")

    const hash = await bcrypt.hash(password, 10)

    await db.insert(userTable).values({ email, password: hash, username })

    return { data: "User successfully created" }
  }

  async signin(login: string, pass: string): Promise<{ accessToken: string }> {
    const user = await db.select().from(userTable).where(eq(userTable.username, login))

    const { id, username, email, password } = user[0]

    console.log("user :", user)

    if (password !== pass) {
      throw new RpcException("Invalid credentials")
    }

    const payload = { id, username, email }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
