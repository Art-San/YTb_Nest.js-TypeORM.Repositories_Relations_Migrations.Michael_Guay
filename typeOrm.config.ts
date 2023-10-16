import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { Item } from './src/items/entities/item.entity'
import { Listing } from './src/items/entities/listing.entity'
import { Comment } from './src/items/entities/comment.entity'
import { Tag } from './src/items/entities/tag.entity'

config()

const configService = new ConfigService()

export default new DataSource({
	type: 'mysql',
	host: configService.getOrThrow('DB_HOST'),
	port: configService.getOrThrow('DB_PORT'),
	database: configService.getOrThrow('DB_DATABASE'),
	username: configService.getOrThrow('DB_USERNAME'),
	password: configService.getOrThrow('DB_PASSWORD'),
	migrations: ['migrations/**'],
	entities: [Item, Listing, Comment, Tag],
})
