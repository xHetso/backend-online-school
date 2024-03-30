import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { IntensiveIdsDto } from './dto/intensiveIds.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { LessonService } from './lesson.service'

@Controller('lessons')
export class LessonController {
	constructor(private readonly lessonService: LessonService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.lessonService.bySlug(slug)
	}

	@Get('by-author/:authorId')
	async byAuthor(@Param('authorId', IdValidationPipe) authorId: Types.ObjectId) {
		return this.lessonService.byAuthor(authorId)
	}

	@UsePipes(new ValidationPipe())
	@Post('by-intensives')
	@HttpCode(200)
	async byIntensives(
		@Body()
		{ intensiveIds }: IntensiveIdsDto,
	) {
		return this.lessonService.byIntensives(intensiveIds)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.lessonService.getAll(searchTerm)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.lessonService.getMostPopular()
	}

	@Put('update-count-opened')
	@HttpCode(200)
	async updateCountOpened(@Body('slug') slug: string) {
		return this.lessonService.updateCountOpened(slug)
	}

	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.lessonService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.lessonService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateLessonDto,
	) {
		return this.lessonService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.lessonService.delete(id)
	}
}
