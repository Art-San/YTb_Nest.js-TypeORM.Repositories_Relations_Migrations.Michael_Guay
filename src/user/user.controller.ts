import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	HttpCode,
	Put,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { CurrentUser } from './user.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('profile')
	// @Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Post('register')
	async register(@Body() user: User): Promise<User> {
		return this.userService.create(user)
	}

	@Get('by-id/:id')
	async getUser(@Param('id') id: string) {
		return this.userService.byId(+id)
	}

	@HttpCode(200)
	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateProfile(+id, dto)
	}

	@Get()
	async getUsers() {
		return this.userService.getAll()
	}
}
