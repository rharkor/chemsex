import { z } from "zod"

export const GetByIdCrowdfundingDto = z.coerce.number()

export type GetByIdCrowdfundingDto = z.infer<typeof GetByIdCrowdfundingDto>
