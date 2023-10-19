import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	// @Get()
	// async getUsers() {
	// 	return this.authService.getAll()
	// }
}
