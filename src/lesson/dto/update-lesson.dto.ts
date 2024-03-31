import {
	IsArray,
	IsBoolean,
	IsString,
} from 'class-validator'

export class UpdateLessonDto {
	@IsString()
	title: string

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

	@IsArray()
	@IsString({ each: true })
	exercises: string[]

	isSendTelegram?: boolean
}
