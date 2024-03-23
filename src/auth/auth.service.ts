import { BadRequestException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthLoginDto } from './dto/auth-login.dto'
import { AuthRegisterDto } from './dto/auth-register.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
	) {}

	async login(dto: AuthLoginDto) {
		return this.validatorUser(dto)
	}

	async register(dto: AuthRegisterDto) {
		const oldUser = await this.UserModel.findOne({ email: dto.email })
		if (oldUser) {
			throw new BadRequestException(
				'User with this email is already registered',
			)
		}

		const salt = await genSalt(10)

		const newUser = new this.UserModel({
			email: dto.email,
			name: dto.name,
			surname: dto.surname,
			password: await hash(dto.password, salt),
		})

		return newUser.save()
	}

	async validatorUser(dto: AuthLoginDto): Promise<UserModel> {
		const user = await this.UserModel.findOne({ email: dto.email })

		const IsValidPassword = await compare(dto.password, user.password)
		if (!IsValidPassword) {
			throw new BadRequestException('Invalid password')
		}
		return user
	}
}
