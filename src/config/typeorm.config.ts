import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const getTypeOrmConfig_1 = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'localhost',
	port: configService.get('DB_PORT'),
	database: configService.get('DB_NAME'),
	username: configService.get('DB_USERNAME'),
	password: configService.get('DB_PASSWORD'),
	logging: configService.get('IS_PROD') === 'false',
	autoLoadEntities: true,
	synchronize: true,
})

// со стрима https://www.youtube.com/watch?v=ZiduLYjXLdg&t=1096s 2:48:57
