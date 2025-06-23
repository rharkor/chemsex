import { z } from "zod"

export const GetCrowdfundingDto = z.object({
  goal: z.coerce.number().nullish(),
  name: z.string().min(3).max(40).nullish(),
  userId: z.coerce.number().nullish(),
  page: z.coerce.number().min(1).default(1),
})

export type GetCrowdfundingDto = z.infer<typeof GetCrowdfundingDto>
