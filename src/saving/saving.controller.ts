import { Controller } from '@nestjs/common';
import { SavingService } from './saving.service';

@Controller('saving')
export class SavingController {
  constructor(private readonly savingService: SavingService) {}
}
