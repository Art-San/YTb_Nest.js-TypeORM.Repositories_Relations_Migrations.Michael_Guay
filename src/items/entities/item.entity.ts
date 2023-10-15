import { AbstractEntity } from 'src/database/abstract.entity'
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Listing } from './listing.entity'
import { Comment } from './comment.entity'
import { Tag } from './teg.entity'

@Entity()
export class Item extends AbstractEntity<Item> {
	@Column()
	name: string

	@Column({ default: true })
	public: boolean

	@OneToOne(() => Listing, { cascade: true }) // One-to-one
	@JoinColumn()
	listing: Listing

	@OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
	comments: Comment[]

	@ManyToMany(() => Tag, { cascade: true })
	@JoinTable()
	tags: Tag[]
}
