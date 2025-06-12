import { z } from "zod"

export const LoginUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type LoginUserDto = z.infer<typeof LoginUserDto>
