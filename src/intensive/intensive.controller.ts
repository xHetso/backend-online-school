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
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CreateIntensiveDto } from './dto/create-intensive.dto'
import { IntensiveService } from './intensive.service'

@Controller('intensives')
export class IntensiveController {
	constructor(private readonly intensiveService: IntensiveService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.intensiveService.bySlug(slug)
	}

	@Get('collections')
	async getCollections() {
		return this.intensiveService.getCollections()
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.intensiveService.getAll(searchTerm)
	}

	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.intensiveService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.intensiveService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateIntensiveDto,
	) {
		return this.intensiveService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.intensiveService.delete(id)
	}
}
