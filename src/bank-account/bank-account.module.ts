import { Module } from '@nestjs/common'
import { BankAccountService } from './bank-account.service'
import { BankAccountController } from './bank-account.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BankAccountEntity } from './bank-account.entity'

@Module({
	controllers: [BankAccountController],
	providers: [BankAccountService],
	// imports: [TypeOrmModule.forFeature([BankAccountEntity])], // 2:51:34
})
export class BankAccountModule {}
