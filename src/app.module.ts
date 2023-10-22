// import { ItemsModule } from './items/items.module'
// import { Module } from '@nestjs/common'
// import { DatabaseModule } from './database/database.module'
// import { ConfigModule } from '@nestjs/config'

// @Module({
// 	imports: [
// 		ConfigModule.forRoot({ isGlobal: true }),
// 		DatabaseModule,
// 		ItemsModule,
// 	],
// 	controllers: [],
// 	providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { GetTypeOrmConfig } from 'getTypeOrmConfig'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		GetTypeOrmConfig,
		UserModule,
		AuthModule,
		// При необходимости импортируйте сюда другие модули, связанные с аутентификацией.
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

// import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { UserModule } from './user/user.module'
// import { ConfigModule, ConfigService } from '@nestjs/config'
// import { AuthModule } from './auth/auth.module'

// @Module({
// 	imports: [
// 		ConfigModule.forRoot({ isGlobal: true }),
// 		TypeOrmModule.forRootAsync({
// 			imports: [ConfigModule],
// 			useFactory: (configService: ConfigService) => ({
// 				type: 'postgres',
// 				host: configService.get('DB_HOST'),
// 				port: configService.get('DB_PORT'),
// 				username: configService.get('DB_USERNAME'),
// 				password: configService.get('DB_PASSWORD'),
// 				database: configService.get('DB_NAME'),
// 				logging: configService.get('IS_PROD') === 'false',
// 				synchronize: true, // В разработке, в производстве установлено значение false
// 				entities: [__dirname + '/**/*.entity{.js, .ts}'],
// 			}),
// 			inject: [ConfigService],
// 		}),
// 		UserModule,
// 		AuthModule,
// 		// При необходимости импортируйте сюда другие модули, связанные с аутентификацией.
// 	],
// 	controllers: [],
// 	providers: [],
// })
// export class AppModule {}
