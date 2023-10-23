import { BankAccountEntity } from 'src/bank-account/bank-account.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

@Entity('Invoice')
export class InvoiceEntity extends Base {
	@Column()
	amount: number
	/*items*/
	/*files*/ //3:12:50

	@Column({ select: false })
	password: string

	@Column({ default: '' })
	name: string

	@Column({ default: '/uploads/default-avatar.png', name: 'avatar_path' })
	avatarPath: string

	@Column({ default: '', type: 'text' })
	address: string

	@OneToMany(() => BankAccountEntity, (account) => account.user, {
		cascade: true,
	})
	bankAccounts?: BankAccountEntity[]
}
