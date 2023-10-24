import { BankAccountEntity } from 'src/bank-account/bank-account.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToMany, OneToOne } from 'typeorm'

@Entity('Saving') // 2:29:09
export class SavingEntity extends Base {
	@Column({ unique: true })
	color: string

	@Column()
	name: string

	@OneToOne(() => BankAccountEntity, (bankAccount) => bankAccount.saving)
	bankAccount: BankAccountEntity

	@ManyToMany(() => UserEntity, (user) => user.savings)
	user: UserEntity
}
