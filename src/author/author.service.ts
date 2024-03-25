import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { AuthorDto } from './author.dto'
import { AuthorModel } from './author.model'

@Injectable()
export class AuthorService {
	constructor(
		@InjectModel(AuthorModel)
		private readonly AuthorModel: ModelType<AuthorModel>,
	) {}

	async bySlug(slug: string) {
		const doc = await this.AuthorModel.findOne({ slug }).exec()
		if (!doc) {
			throw new NotFoundException('Author not found')
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
				],
			}

		// Aggregation

		return this.AuthorModel.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}

	/* Admin place */
	async byId(_id: string) {
		const author = await this.AuthorModel.findById(_id)
		if (!author) {
			throw new NotFoundException('Author not found')
		}
		return author
	}

	async create() {
		const defaultValue: AuthorDto = {
			name: '',
			slug: '',
			photo: '',
		}
		const author = await this.AuthorModel.create(defaultValue)
		return author._id
	}

	async update(_id: string, dto: AuthorDto) {
		const updateDoc = await this.AuthorModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) {
			throw new NotFoundException('Author not found')
		}
		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.AuthorModel.findByIdAndDelete(id).exec()
		if (!deleteDoc) {
			throw new NotFoundException('Author not found')
		}
		return deleteDoc
	}
}
