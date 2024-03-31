import { IsString } from 'class-validator'

export class CreateIntensiveDto {
	@IsString()
	name: string
	@IsString()
	slug: string
	@IsString()
	description: string
	@IsString()
	poster: string
}
