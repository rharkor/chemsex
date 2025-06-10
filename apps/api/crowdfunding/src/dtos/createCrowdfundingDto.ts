import { z } from "zod"

export const CreateCrowdfundingDto = z.object({
 goal: z.number(),
 endDate: z.date(), 
 name: z.string().min(3).max(40), 
 description: z.string(),
 image: z.string().optional(), 
 
})

export type CreateCrowdfundingDto = z.infer<typeof CreateCrowdfundingDto>
