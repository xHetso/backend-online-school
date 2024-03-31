import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { LessonModel } from './lesson.model'

@Injectable()
export class LessonService {
	constructor(
		@InjectModel(LessonModel) private readonly LessonModel: ModelType<LessonModel>,
	) {}

	async getAll(searchTerm?: string) {
		let options = {}
		if (searchTerm)
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}

		return this.LessonModel.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.populate('authors intensives')
			.exec()
	}

	async bySlug(slug: string) {
		const doc = await this.LessonModel.findOne({ slug })
			.populate('authors intensives')
			.exec()
		if (!doc) {
			throw new NotFoundException('Lesson not found')
		}
		return doc
	}

	async byAuthor(authorId: Types.ObjectId) {
		const docs = await this.LessonModel.find({ authors: authorId }).exec()
		if (!docs) {
			throw new NotFoundException('Lessons not found')
		}
		return docs
	}

	async byIntensives(genreIds: Types.ObjectId[]) {
		const docs = await this.LessonModel.find({
			intensives: { $in: genreIds },
		}).exec()
		if (!docs) {
			throw new NotFoundException('Lessons not found')
		}
		return docs
	}

	async updateCountOpened(slug: string) {
		const updateDoc = await this.LessonModel.findOneAndUpdate(
			{ slug },
			{
				$inc: {
					countOpened: 1,
				},
			},
			{
				new: true,
			},
		).exec()
		if (!updateDoc) throw new NotFoundException('Lesson not found')

		return updateDoc
	}

	async getMostPopular() {
		return await this.LessonModel.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('intensives')
			.exec()
	}

	/* Admin place */
	async byId(_id: string) {
		const doc = await this.LessonModel.findById(_id)
		if (!doc) {
			throw new NotFoundException('Lesson not found')
		}
		return doc
	}

	async create() {
		const defaultValue: UpdateLessonDto = {
            title: '',
            slug: '',
            videoUrl: '',
            intensives: [],
            authors: [],
			exercises: [],
            isSendTelegram: false,
		}
		const lesson = await this.LessonModel.create(defaultValue)
		return lesson._id
	}

	async update(_id: string, dto: UpdateLessonDto) {
		/* Telegram notifications */

		const updateDoc = await this.LessonModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) {
			throw new NotFoundException('Lesson not found')
		}
		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.LessonModel.findByIdAndDelete(id).exec()
		if (!deleteDoc) throw new NotFoundException('Lesson not found')

		return deleteDoc
	}
}
