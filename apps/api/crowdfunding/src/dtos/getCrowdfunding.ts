import { z } from "zod"

export const GetCrowdfundingDto = z.object({
  goal: z.coerce.number().nullish(),
  name: z.string().min(3).max(40).nullish(),
  userId: z.coerce.number().nullish(),
})

export type GetCrowdfundingDto = z.infer<typeof GetCrowdfundingDto>
