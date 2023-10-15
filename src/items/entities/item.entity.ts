import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Listing } from './listing.entity'

@Entity()
export class Item {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ default: true })
	public: boolean

	@OneToOne(() => Listing, { cascade: true }) // One-to-one
	@JoinColumn()
	listing: Listing

	constructor(item: Partial<Item>) {
		Object.assign(this, item)
	}
}
