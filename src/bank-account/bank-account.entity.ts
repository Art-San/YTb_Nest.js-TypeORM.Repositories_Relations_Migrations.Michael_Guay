import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BankCardEntity } from './bank-card.entity'

@Entity('Bank_account')
export class BankAccountEntity extends Base {
	// 2:19:36

	@Column({ unique: true })
	number: string

	@Column({ default: '' })
	name: string

	@Column({ default: '/uploads/default-avatar.png', name: 'avatar_path' })
	avatarPath: string

	@Column({ default: '', type: 'text' })
	address: string

	@OneToOne(() => BankCardEntity, (card) => card.bankAccount, { cascade: true })
	@JoinColumn()
	card: BankCardEntity
}
