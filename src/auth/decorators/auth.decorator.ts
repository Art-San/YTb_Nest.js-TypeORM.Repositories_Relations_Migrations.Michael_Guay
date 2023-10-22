// =============  Сам перефразировал
// import { applyDecorators, UseGuards } from '@nestjs/common'
// import { JwtAuthGuard } from '../guards/jwt.guard'

// export function Auth() {
// 	return applyDecorators(UseGuards(JwtAuthGuard))
// }

//==============  Со стрима  ========================================
// {1:37:53} https://www.youtube.com/watch?v=ZiduLYjXLdg&t=1096s

import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export const Auth = () => UseGuards(AuthGuard('jwt'))

// ============ RED_Group_Back-end_for_online-sinema_Nest.js ======

// import { applyDecorators, UseGuards } from '@nestjs/common'
// import { TypeRole } from '../auth.interface'
// import { OnlyAdminGuard } from '../guards/admin.guard'
// import { JwtAuthGuard } from '../guards/jwt.guard'

// export function Auth(role: TypeRole = 'user') {
// 	return applyDecorators(
// 		//applyDecorators объединяет декораторы (Для композиции)
// 		role === 'admin'
// 			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
// 			: UseGuards(JwtAuthGuard)
// 	)
// }
