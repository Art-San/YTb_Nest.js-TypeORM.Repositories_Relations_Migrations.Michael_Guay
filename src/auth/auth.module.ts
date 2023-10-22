import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserEntity } from 'src/user/user.entity'
import { getJWTConfig } from 'src/config/jwt.config'

import { UserModule } from 'src/user/user.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	controllers: [AuthController],
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		UserModule,
	],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

// providers: [AuthService, JwtStrategy],
