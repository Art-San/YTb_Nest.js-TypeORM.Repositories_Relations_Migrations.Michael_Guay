import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne } from 'typeorm'
import { InvoiceEntity } from './invoice.entity'

@Entity('Invoice_file')
export class InvoiceFileEntity extends Base {
	@Column({ unique: true })
	name: string

	@Column()
	size: string

	@Column({ unique: true })
	url: string

	@ManyToOne(() => InvoiceEntity, (invoice) => invoice.files)
	invoice?: InvoiceEntity
}
