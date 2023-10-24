import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BankAccountEntity } from './bank-account.entity'
import { EnumPaymentSystem, EnumTypeCard } from './bank-account.types'

@Entity('Bank_card')
export class BankCardEntity extends Base {
	@Column({ unique: true, length: 16 })
	number: string

	@Column({ unique: true, name: 'expire_date' })
	expireDate: string

	@Column()
	cvc: number

	@Column({ type: 'enum', enum: EnumPaymentSystem, name: 'payment_system' })
	paymentSystem: EnumPaymentSystem

	@Column({ type: 'enum', enum: EnumTypeCard, name: 'type_card' })
	typeCard: EnumTypeCard

	@Column({ name: 'bank_name' })
	bankName: string

	@OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.card)
	bankAccount: BankAccountEntity
}
