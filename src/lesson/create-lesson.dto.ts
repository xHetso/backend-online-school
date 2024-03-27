import {
	IsArray,
	IsBoolean,
	IsString,
} from 'class-validator'

export class CreateMovieDto {
	@IsString()
	poster: string

	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	slug: string

	@IsString()
	videoUrl: string

	@IsArray()
	@IsString({ each: true })
	intensives: string[]

	@IsArray()
	@IsString({ each: true })
	authors: string[]

	@IsBoolean()
	isSendTelegram?: boolean
}
