import { Module } from '@nestjs/common'
import { InvoiceService } from './invoice.service'
import { InvoiceController } from './invoice.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceEntity } from './invoice.entity'
import { InvoiceFileEntity } from './invoice-file.entity'
import { InvoiceItemEntity } from './invoice-item.entity'

@Module({
	controllers: [InvoiceController],
	providers: [InvoiceService],
	imports: [
		TypeOrmModule.forFeature([
			InvoiceEntity,
			InvoiceFileEntity,
			InvoiceItemEntity,
		]),
	],
})
export class InvoiceModule {}
