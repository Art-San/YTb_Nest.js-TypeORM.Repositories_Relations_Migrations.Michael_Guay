import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDto } from './user.dto'
import { User } from './user.entity'
import { hash } from 'argon2'
// import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}
	// constructor(
	// 	@InjectRepository(User)
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

		return this.userRepository.save(user)
	}

	async create(user: User): Promise<User> {
		// const userNew = this.userRepository.save(user)
		// return this.userRepository.save(user)
		throw new UnauthorizedException('Приходит из user.service.ts create')
	}

	// async findOne(username: string): Promise<User | undefined> {
	// 	return this.userRepository.findOne({ username })
	// }
	// async findOne(username: string) {
	// 	return username
	// }

	async getAll() {
		return this.userRepository.find()
	}
}
