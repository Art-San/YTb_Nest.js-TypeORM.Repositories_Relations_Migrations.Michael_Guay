import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { CurrentUser } from './user.decorator'
import { UserDto } from './dto/user.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Get('by-id/:id')
	async getUser(@Param('id') id: string) {
		return this.userService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('profile')
	@Auth()
	async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(+id, dto)
	}
	// @UsePipes(new ValidationPipe())
	// @HttpCode(200)
	// @Put(':id')
	// @Auth()
	// async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
	// 	return this.userService.updateProfile(+id, dto)
	// }

	@Get()
	async getUsers() {
		return this.userService.getAll()
	}

	// @HttpCode(200)
	// @Post('register')
	// async register(@Body() user: UserEntity): Promise<UserEntity> {
	// 	return this.userService.create(user)
	// }
}
