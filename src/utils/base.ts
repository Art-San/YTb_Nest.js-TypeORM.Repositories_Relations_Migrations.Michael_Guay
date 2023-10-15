import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

export abstract class Base {
	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date
}
// 19:02 https://www.youtube.com/watch?v=ZiduLYjXLdg&t=1096s
