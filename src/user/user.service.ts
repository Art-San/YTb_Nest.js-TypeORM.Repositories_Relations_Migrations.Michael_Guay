import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDto } from './dto/user.dto'
import { UserEntity } from './user.entity'
import { hash } from 'argon2'
// import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}
	// constructor(
	// 	@InjectRepository(UserEntity)
	// 	private userRepository: UserRepository
	// ) {}

	async byId(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id,
			},
			// relations: {
			// contacts: true,
			// },
			// order: {/*TODO: надо добавить поля */
			// 	createdAt: 'DESC',
			// },
		})

		if (!user)
			throw new NotFoundException(
				'Юзер не найден! Приходит из user.service.ts byId'
			)
		return user
	}

	async updateProfile(id: number, dto: UserDto) {
		const user = await this.byId(id)

		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })
		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email занят')

		if (dto.password) {
			user.password = await hash(dto.password)
		}

		user.email = dto.email // 19:26
		user.name = dto.name
		user.address = dto.address
		user.avatarPath = dto.avatarPath

		const updateUser = await this.userRepository.save(user)

		return updateUser
		// throw new NotFoundException('обновил')
	}

	async getAll() {
		return this.userRepository.find()
	}
}
