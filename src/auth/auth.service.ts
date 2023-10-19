import { UserRepository } from './../user/user.repository'
import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common'
import { AuthDto } from './auth.dto'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { User } from 'src/user/user.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService
	) // private readonly userRepository: Repository<User>
	{}

	async register(dto: AuthDto) {
		// console.log('dto', dto)
		// const oldUser = await this.userRepository.find({dto.email})
		// console.log('oldUser', oldUser)
		// if (oldUser) {
		// 	throw new BadRequestException('Юзер с таким email уже есть в системе')
		// }

		// const newUser = this.userRepository.create({
		// 	email: dto.email,
		// 	password: dto.password,
		// })

		// const user = await this.userRepository.save(newUser)

		return null
	}

	async login(dto: AuthDto) {
		// const user = await this.validateUser(dto)
		// const tokens = await this.issueTokenPair(String(user.id))
		// return {
		// 	user: this.returnUserFields(user),
		// 	...tokens,
		// }
	}

	async getAll() {
		return this.userService.getAll()
	}
}
