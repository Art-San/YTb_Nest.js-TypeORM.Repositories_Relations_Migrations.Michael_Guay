// import { Injectable } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
// import { PassportStrategy } from '@nestjs/passport'
// import { ModelType } from '@typegoose/typegoose/lib/types'
// import { InjectModel } from 'nestjs-typegoose'
// import { ExtractJwt, Strategy } from 'passport-jwt'
// import { UserService } from 'src/user/user.service'
// import { UserModel } from '../../user/user.model'

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
// 	constructor(
// 		private readonly configService: ConfigService,
// 		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
// 	) {
// 		super({
// 			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 			ignoreExpiration: true,
// 			secretOrKey: configService.get('JWT_SECRET'),
// 		})
// 	}

// 	async validate({ _id }: Pick<UserModel, '_id'>) {
// 		// return this.UserModel.findById(_id).exec()
// 		const user = await this.UserModel.findById(_id)
// 		return user
// 	}
// }

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from 'src/user/user.entity'

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

	async validate(payload: any) {
		const user = await this.userRepository.findOne(payload.sub)
		if (!user) {
			return null
		}
		return user
	}
}

/*TODO: надо дальше разбираться*/
