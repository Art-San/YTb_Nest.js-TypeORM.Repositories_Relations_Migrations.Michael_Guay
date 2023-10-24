import { Module } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { TransactionEntity } from './transaction.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	controllers: [TransactionController],
	providers: [TransactionService],
	imports: [TypeOrmModule.forFeature([TransactionEntity])],
})
export class TransactionModule {}
