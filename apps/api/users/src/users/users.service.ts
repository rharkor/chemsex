import * as bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { CreateUserDto } from "src/dtos/singupUserDto"

import { Injectable } from "@nestjs/common"
import { RpcException } from "@nestjs/microservices"
import { db } from "@party-n-play/db"
import { userTable } from "@party-n-play/db/schemas/user"

@Injectable()
export class UsersService {
  async signup(createUserDto: CreateUserDto): Promise<Record<string, string>> {
    const { email, password, username } = createUserDto

    const user = await db.select().from(userTable).where(eq(userTable.email, email))

    if (user.length > 0) throw new RpcException("User already exists !")

    const hash = await bcrypt.hash(password, 10)

    await db.insert(userTable).values({ email, password: hash, username })

    return { data: "User successfully created" }
  }
}
