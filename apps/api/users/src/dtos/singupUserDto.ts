import { z } from "zod"

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
  username: z.string().min(3).max(20),
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>
