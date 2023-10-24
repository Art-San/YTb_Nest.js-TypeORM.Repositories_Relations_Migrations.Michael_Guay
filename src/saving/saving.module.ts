import { Module } from '@nestjs/common'
import { SavingService } from './saving.service'
import { SavingController } from './saving.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SavingEntity } from './saving.entity'

@Module({
	controllers: [SavingController],
	providers: [SavingService],
	imports: [TypeOrmModule.forFeature([SavingEntity])],
})
export class SavingModule {}
