import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user)
	}

	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}
}
