import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

// Этот код из YTb_Let's_try.Fullstack
// не обновляются, не связываются Entity в с Б/Д -
// думаю потому что не хватает autoLoadEntities: true,
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
				autoLoadEntities: true,
				entities: [__dirname + '/**/*.entity{.js, .ts}'],
			}),
			inject: [ConfigService], //g
		}),
	],
})
export class GetTypeOrmConfig {}
