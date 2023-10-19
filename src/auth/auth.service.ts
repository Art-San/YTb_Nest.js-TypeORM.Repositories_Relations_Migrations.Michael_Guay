import { UserRepository } from './../user/user.repository'
import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common'
import { AuthDto } from './auth.dto'

@Injectable()
export class AuthService {
	constructor(private readonly userRepository: UserRepository) {}

	async register(dto: AuthDto) {
		const oldUser = await this.userRepository.findOne({
			where: {
				email: dto.email,
			},
		})
		if (oldUser) {
			throw new BadRequestException('Юзер с таким email уже есть в системе')
		}

		const newUser = this.userRepository.create({
			email: dto.email,
			password: dto.password,
		})

		const user = await this.userRepository.save(newUser)

		return user
	}

	async login(dto: AuthDto) {
		// return this.validateUser(dto)
		const user = await this.validateUser(dto)

		return user
	}
	async validateUser(dto: AuthDto): Promise<UserModel> {
		const user = await this.userRepository.findOne({
			where: {
				email: dto.email,
			},
		})
		if (!user) {
			throw new UnauthorizedException('Юзер с таким email нет в системе')
		}

		// const isValidPassword = await compare(dto.password, user.password)
		// if (!isValidPassword) {
		// 	throw new UnauthorizedException('Не верный пароль')
		// }
		return user
	}
}
