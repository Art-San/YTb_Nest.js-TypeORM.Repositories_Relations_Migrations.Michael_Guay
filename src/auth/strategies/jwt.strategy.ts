import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'

// interface IJwtPayload {
// 	id: number
// 	iat: number
// 	exp: number
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	async validate({ id }: Pick<UserEntity, 'id'>) {
		const user = await this.userRepository.findOne({
			where: {
				id,
			},
		})
		if (!user) {
			return null
		}

		return user
	}
	// async validate(payload: Pick<UserEntity, 'id'>) {
	// 	const user = await this.userRepository.findOne({
	// 		where: {
	// 			id: payload.id,
	// 		},
	// 	})
	// 	if (!user) {
	// 		return null
	// 	}

	// 	return user
	// }
}
