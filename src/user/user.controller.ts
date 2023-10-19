import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('register')
	async register(@Body() user: User): Promise<User> {
		return this.userService.create(user)
	}
}
