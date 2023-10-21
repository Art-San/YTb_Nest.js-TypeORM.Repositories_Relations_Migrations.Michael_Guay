import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { ContactsEntity } from './contacts.entity'

@Entity('User')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ default: '' })
	name: string

	@Column({ default: '/uploads/default-avatar.png', name: 'avatar_path' })
	avatarPath: string

	@Column({ default: '', type: 'text' })
	address: string

	@OneToMany(() => ContactsEntity, (contact) => contact.contacts, {
		cascade: true,
	})
	contacts: ContactsEntity[]

	// @OneToOne(() => ContactsEntity, { cascade: true })
	// @JoinColumn()
	// contacts: ContactsEntity

	//https://progressivecoder.com/typeorm-entity-relations/
}

// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

// @Entity()
// export class UserEntity {
// 	@PrimaryGeneratedColumn()
// 	id: number

// 	@Column()
// 	email: string

// 	@Column()
// 	password: string
// }
