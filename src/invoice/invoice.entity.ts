import { BankAccountEntity } from 'src/bank-account/bank-account.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { InvoiceFileEntity } from './invoiceFile.entity'
import { InvoiceItemEntity } from './invoiceItem.entity'

@Entity('Invoice')
export class InvoiceEntity extends Base {
	@Column()
	amount: number

	@OneToMany(() => InvoiceItemEntity, (item) => item.invoice, {
		cascade: true,
	})
	items?: InvoiceItemEntity[]

	@OneToMany(() => InvoiceFileEntity, (file) => file.invoice, {
		cascade: true,
	})
	files?: InvoiceFileEntity[]
}
