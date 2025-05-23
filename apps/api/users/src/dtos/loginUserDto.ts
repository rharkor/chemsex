import { z } from "zod"

export const LoginUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(10),
})

export type LoginUserDto = z.infer<typeof LoginUserDto>
