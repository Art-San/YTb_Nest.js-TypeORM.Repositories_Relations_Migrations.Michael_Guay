import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.getOrThrow('DB_HOST'),
				port: configService.getOrThrow('DB_PORT'),
				username: configService.getOrThrow('DB_USERNAME'),
				password: configService.getOrThrow('DB_PASSWORD'),
				database: configService.getOrThrow('DB_NAME'),
				logging: configService.get('IS_PROD') === 'false',
				autoLoadEntities: true, // автоматом загружает модели, не надо тип и где находятся
				synchronize: configService.getOrThrow('SYNCHRONIZE'), // Синхронизация срабатывает при каждом запуске, используем при разработке
			}),
			inject: [ConfigService], //g
		}),
	],
})
export class DatabaseModule {}
// 13:13
