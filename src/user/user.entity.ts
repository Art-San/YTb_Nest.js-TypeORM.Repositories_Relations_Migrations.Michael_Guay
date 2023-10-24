import { BankAccountEntity } from 'src/bank-account/bank-account.entity'
import { SavingEntity } from 'src/saving/saving.entity'
import { TransactionEntity } from 'src/transaction/transaction.entity'
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

	@OneToMany(() => BankAccountEntity, (bankAccount) => bankAccount.user, {
		cascade: true,
	})
	bankAccounts: BankAccountEntity[]

	@OneToMany(() => SavingEntity, (saving) => saving.user, {
		cascade: true,
	})
	savings: SavingEntity[]

	@OneToMany(() => TransactionEntity, (transaction) => transaction.recipient, {
		cascade: true,
	})
	transactions: TransactionEntity[]
}

// https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md

// @OneToOne(() => ContactsEntity, { cascade: true })
// @JoinColumn()
// contacts: ContactsEntity

//https://progressivecoder.com/typeorm-entity-relations/
