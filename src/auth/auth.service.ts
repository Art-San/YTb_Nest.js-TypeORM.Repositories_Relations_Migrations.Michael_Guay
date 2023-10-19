import { JwtService } from '@nestjs/jwt'
import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
	NotFoundException,
} from '@nestjs/common'
import { AuthDto } from './auth.dto'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { hash, verify } from 'argon2'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>, // private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async register(dto: AuthDto) {
		const oldUser = await this.userRepository.findOneBy({ email: dto.email })
		if (oldUser) {
			throw new BadRequestException('Юзер с таким email уже есть в системе')
		}

		const newUser = this.userRepository.create({
			email: dto.email,
			password: await hash(dto.password),
		})

		const user = await this.userRepository.save(newUser)

		return user
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokenPair(String(user.id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async validateUser(dto: AuthDto): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: {
				email: dto.email,
			},
			select: ['id', 'email', 'password'],
		})

		if (!user) {
			throw new NotFoundException('Пользователь не найден')
		}

		const isValidPassword = await verify(user.password, dto.password)
		console.log('isValidPassword', isValidPassword)
		if (!isValidPassword) {
			throw new UnauthorizedException('Не правильный пароль')
		}
		return user
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d',
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h',
		})

		return { refreshToken, accessToken }
	}

	returnUserFields(user: UserEntity) {
		return {
			id: user.id,
			email: user.email,
		}
	}
}
