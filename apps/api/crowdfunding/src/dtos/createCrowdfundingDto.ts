import { z } from "zod"

export const CreateCrowdfundingSchema = z.object({
 goal: z.integer(),
 endDate: z.date(), 
 name: z.string().min(3).max(40), 
 description: z.text(), 
 totalDonations: z.integer(),
 image: z.string().optional(), 
 userId: z.number(),
})

export type CreateCrowdfunding = z.infer<typeof CreateCrowdfundingSchema>
