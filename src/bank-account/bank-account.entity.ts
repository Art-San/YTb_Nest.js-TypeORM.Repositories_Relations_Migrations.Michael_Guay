import { SavingEntity } from 'src/saving/saving.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm'
import { BankCardEntity } from './bank-card.entity'

@Entity('Bank_account')
export class BankAccountEntity extends Base {
	@Column({ unique: true })
	number: string

	@Column({ default: 0 })
	balance: number

	@OneToOne(() => BankCardEntity, (card) => card.bankAccount)
	@JoinColumn()
	card: BankCardEntity

	@ManyToOne(() => UserEntity, (user) => user.bankAccounts)
	user?: UserEntity

	@OneToOne(() => SavingEntity, (saving) => saving.bankAccount)
	saving?: SavingEntity
}

// https://www.youtube.com/watch?v=ZiduLYjXLdg&t=1096s
