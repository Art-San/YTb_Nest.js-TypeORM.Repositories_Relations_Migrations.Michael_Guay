import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { User } from 'src/user/user.entity'
import { getJWTConfig } from 'src/config/jwt.config'
import { UserRepository } from 'src/user/user.repository'

@Module({
	controllers: [AuthController],
	imports: [
		TypeOrmModule.forFeature([User]), // Используйте TypeORM для работы с сущностью User
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	providers: [AuthService, UserRepository],
})
export class AuthModule {}
