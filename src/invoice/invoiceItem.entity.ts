import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne } from 'typeorm'
import { InvoiceEntity } from './invoice.entity'

@Entity('Invoice_item')
export class InvoiceItemEntity extends Base {
	@Column({ unique: true })
	name: string

	@Column()
	duration: number

	@Column()
	rate: number

	@Column()
	amount: number

	@ManyToOne(() => InvoiceEntity, (invoice) => invoice.items)
	invoice?: InvoiceEntity
}
