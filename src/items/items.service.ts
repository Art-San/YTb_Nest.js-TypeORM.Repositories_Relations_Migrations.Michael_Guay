import { Item } from './entities/item.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager, Repository } from 'typeorm'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Listing } from './entities/listing.entity'
import { Comment } from './entities/comment.entity'
import { Tag } from './entities/teg.entity'

@Injectable()
export class ItemsService {
	constructor(
		@InjectRepository(Item)
		private readonly itemsRepository: Repository<Item>,
		private readonly entityManager: EntityManager
	) {}

	async create(createItemDto: CreateItemDto) {
		const listing = new Listing({
			...createItemDto.listing,
			rating: 0,
		})
		const tags = createItemDto.tags.map((createTagDto) => new Tag(createTagDto))
		const item = new Item({
			...createItemDto,
			comments: [], // 38:02
			tags,
			listing,
		})
		await this.entityManager.save(item)
		return item
	}

	async findAll() {
		return await this.itemsRepository.find({
			relations: {
				listing: true,
				comments: true,
			},
		})
	}

	// One-to-one
	async findOne(id: number) {
		return await this.itemsRepository.findOne({
			where: { id },
			relations: {
				listing: true,
				comments: true,
				tags: true,
			},
		})
	}

	async update(id: number, updateItemDto: UpdateItemDto) {
		// const item = await this.itemsRepository.findOneBy({ id })
		// item.public = updateItemDto.public
		// const comments = updateItemDto.comments.map(
		// 	(createCommentDto) => new Comment(createCommentDto)
		// )
		// item.comments = comments
		// await entityManager.save(item)

		// transaction
		await this.entityManager.transaction(async (entityManager) => {
			const item = await this.itemsRepository.findOneBy({ id })
			item.public = updateItemDto.public
			const comments = updateItemDto.comments.map(
				(createCommentDto) => new Comment(createCommentDto)
			)
			item.comments = comments
			await entityManager.save(item)
			throw new Error('Это ошибка') // Эта ошибка не позволила произвести запись в бд
			const tagContent = `${Math.random()}`
			const tag = new Tag({ content: tagContent })
			await entityManager.save(tag)
		})

		// return item
	}

	// Работает вар
	// async update(id: number, updateItemDto: UpdateItemDto) {
	// 	const item = await this.itemsRepository.findOne({
	// 		where: { id },
	// 	})
	// 	if (!item)
	// 		throw new NotFoundException(
	// 			'Товар не найден. Ошибка из обновления item.service'
	// 		)

	// 	const updatedItem = await this.itemsRepository.update(id, updateItemDto)
	// 	return updatedItem
	// }

	async remove(id: number) {
		await this.itemsRepository.delete(id)
	}
	// Работает вар
	// async remove(id: number) {
	// 	const item = await this.itemsRepository.findOne({
	// 		where: { id },
	// 	})
	// 	if (!item)
	// 		throw new NotFoundException('Category not found. item.service remove')
	// 	await this.itemsRepository.delete(id)
	//  return item
	// }
}
