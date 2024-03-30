import { IsNotEmpty, MinLength } from 'class-validator'
import { Types } from 'mongoose'

export class IntensiveIdsDto {
	@IsNotEmpty()
	@MinLength(24, { each: true })
	intensiveIds: Types.ObjectId[]
}
