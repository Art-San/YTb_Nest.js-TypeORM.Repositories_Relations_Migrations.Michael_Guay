import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { Item } from '../items/entities/item.entity'
import { Listing } from '../items/entities/listing.entity'
import { Comment } from '../items/entities/comment.entity'
import { Tag } from '../items/entities/tag.entity'

config()

const configService = new ConfigService()

export default new DataSource({
	type: 'postgres',
	host: configService.getOrThrow('DB_HOST'),
	port: configService.getOrThrow('DB_PORT'),
	database: configService.getOrThrow('DB_NAME'),
	username: configService.getOrThrow('DB_USERNAME'),
	password: configService.getOrThrow('DB_PASSWORD'),
	migrations: ['migrations/**'],
	entities: [Item, Listing, Comment, Tag],
})

// для миграции делали, но миграция так и не заработала
