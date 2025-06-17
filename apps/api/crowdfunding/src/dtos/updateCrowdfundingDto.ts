import { z } from "zod"

export const UpdateCrowdfundingDto = z.object({
  id: z.number(),
  data: z.object({
    goal: z.number(),
    endDate: z.date(),
    name: z.string().min(3).max(40),
    description: z.string().max(500),
    image: z.string().optional(),
  }),
  ctx: z.object({ token: z.string().nullish() }),
})

export type UpdateCrowdfundingDto = z.infer<typeof UpdateCrowdfundingDto>
