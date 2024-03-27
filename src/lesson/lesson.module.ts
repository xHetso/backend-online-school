import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { LessonController } from './lesson.controller'
import { LessonModel } from './lesson.model'
import { LessonService } from './lesson.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: LessonModel,
				schemaOptions: {
					collection: 'Lesson',
				},
			},
		]),
	],
	controllers: [LessonController],
	providers: [LessonService],
})
export class LessonModule {}
