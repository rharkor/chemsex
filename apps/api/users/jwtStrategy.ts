import { eq } from "drizzle-orm"
import { ExtractJwt, Strategy } from "passport-jwt"

import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { db } from "@party-n-play/db"
import { userTable } from "@party-n-play/db/schemas/user"

type User = {
  id: number
  email: string
  password: string
  username: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("SECRET_KEY"),
      ignoreExpiration: false,
    })
  }

  async validate(user: User) {
    const { email } = user

    const userData = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .then((response) => response.at(0))

    if (!userData) {
      throw new UnauthorizedException("Unauthorized")
    }

    return userData
  }
}
