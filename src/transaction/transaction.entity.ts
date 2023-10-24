import { InvoiceEntity } from 'src/invoice/invoice.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToMany, OneToOne } from 'typeorm'

export enum EnumTransactionStatus {
	COMPLETE = 'Complete',
	CANCELED = 'Canceled',
	PENDING = 'Pending',
}

@Entity('Transaction')
export class TransactionEntity extends Base {
	@ManyToMany(() => UserEntity, (user) => user.transactions)
	recipient: UserEntity

	@OneToOne(() => InvoiceEntity, { cascade: true })
	invoice?: InvoiceEntity

	@Column({ type: 'enum', enum: EnumTransactionStatus })
	status: EnumTransactionStatus
}
