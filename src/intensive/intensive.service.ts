import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateIntensiveDto } from './dto/create-intensive.dto'
import { IntensiveModel } from './intensive.model'

@Injectable()
export class IntensiveService {
	constructor(
		@InjectModel(IntensiveModel)
		private readonly IntensiveModel: ModelType<IntensiveModel>,
	) {}

	async bySlug(slug: string) {
		const doc = await this.IntensiveModel.findOne({ slug }).exec()
		if (!doc) {
			throw new NotFoundException('Intensive not found')
		}
		return doc
	}

	async getAll(searchTerm?: string) {
		let options = {}
		if (searchTerm)
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		return this.IntensiveModel.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}

	async getCollections() {
		const genres = await this.getAll()
		const collections = genres
		/* Need will write */
		return collections
	}

	/* Admin place */
	async byId(_id: string) {
		const intensive = await this.IntensiveModel.findById(_id)
		if (!intensive) {
			throw new NotFoundException('Intensive not found')
		}
		return intensive
	}

	async create() {
		const defaultValue: CreateIntensiveDto = {
			name: '',
			slug: '',
			description: '',
			poster: '',
		}
		const intensive = await this.IntensiveModel.create(defaultValue)
		return intensive._id
	}

	async update(_id: string, dto: CreateIntensiveDto) {
		const updateDoc = await this.IntensiveModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) {
			throw new NotFoundException('Intensive not found')
		}
		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.IntensiveModel.findByIdAndDelete(id).exec()
		if (!deleteDoc) {
			throw new NotFoundException('Intensive not found')
		}
		return deleteDoc
	}
}
