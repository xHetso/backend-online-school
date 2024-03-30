import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { AuthorModel } from 'src/author/author.model'
import { IntensiveModel } from 'src/intensive/intensive.model'

export interface LessonModel extends Base {}

export class LessonModel extends TimeStamps {
	@prop()
	title: string
	@prop({ unique: true })
	slug: string
	@prop()
	videoUrl: string
	@prop({default: 4.0})
	rating?: number
	@prop({ref: () => IntensiveModel})
	intensives: Ref<IntensiveModel>[]
	@prop({ref: () => AuthorModel})
	authors: Ref<AuthorModel>[]
	@prop({ default: false })
	isSendTelegram?: boolean
}
