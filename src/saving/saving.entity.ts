import { BankAccountEntity } from 'src/bank-account/bank-account.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

@Entity('Saving')
export class SavingEntity extends Base {
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

	@OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.saving)
	bankAccount: BankAccountEntity
}
