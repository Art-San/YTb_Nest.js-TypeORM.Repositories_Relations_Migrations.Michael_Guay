import { Controller } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { InvoiceService } from './invoice.service'

@Controller('invoice')
export class InvoiceController {
	constructor(private readonly invoiceService: InvoiceService) {}

	// @Get('profile')
	// @Auth()
	// async getProfile(@CurrentUser('id') id: number) {
	// 	return this.userService.byId(id)
	// }

	// @Get('by-id/:id')
	// async getUser(@Param('id') id: string) {
	// 	return this.userService.byId(+id)
	// }

	// @UsePipes(new ValidationPipe())
	// @HttpCode(200)
	// @Put('profile')
	// @Auth()
	// async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
	// 	return this.userService.updateProfile(+id, dto)
	// }

	// @Get()
	// @Auth()
	// async getInvoices(@CurrentUser('id') id: number) {
	// 	return this.invoiceService.getInvoicesByUser(id)
	// }
}
