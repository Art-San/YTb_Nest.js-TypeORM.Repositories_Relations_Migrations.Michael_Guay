import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from './user.entity'

// Данный декоратор CurrentUser используется для извлечения
// информации о текущем пользователе из запроса и передачи
// её в качестве параметра в обработчики запросов

export const CurrentUser = createParamDecorator(
	(data: keyof UserEntity, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		console.log('request', request)
		const user = request.user
		console.log('user', user)

		// return null
		// return data ? user[data] : user
	}
)
