import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				logging: configService.get('IS_PROD') === 'false',
				synchronize: true, // В разработке, в производстве установлено значение false
				entities: [__dirname + '/**/*.entity{.js, .ts}'],
			}),
			inject: [ConfigService], //g
		}),
	],
})
export class GetTypeOrmConfig {}
