import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BankAccountEntity } from './bank-account.entity'

export enum EnumTypeCard {
	VISA = 'VISA',
	MAESTRO = 'MAESTRO',
	MASTERCARD = 'MASTERCARD',
	MIR = 'MIR',
}
@Entity('Bank_card')
export class BankCardEntity extends Base {
	@Column({ unique: true, length: 16 })
	number: string

	@Column({ unique: true, name: 'expire_date' })
	expireDate: string

	@Column()
	cvc: number

	@Column({ type: 'enum', enum: EnumTypeCard })
	type: EnumTypeCard

	@OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.card)
	bankAccount: BankAccountEntity
}
