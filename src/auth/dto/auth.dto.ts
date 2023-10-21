import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsString()
	@IsNotEmpty()
	email: string

	@MinLength(6, {
		message: 'Пароль должен содержать не менее 6 символов',
	})
	@IsString()
	password: string
}
// export class AuthDto {
// 	email: string
// 	password: string
// }
