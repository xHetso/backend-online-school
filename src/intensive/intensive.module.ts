import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { IntensiveController } from './intensive.controller'
import { IntensiveModel } from './intensive.model'
import { IntensiveService } from './intensive.service'

@Module({
	controllers: [IntensiveController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: IntensiveModel,
				schemaOptions: {
					collection: 'Intensive',
				},
			},
		]),
	],
	providers: [IntensiveService],
})
export class IntensiveModule {}
