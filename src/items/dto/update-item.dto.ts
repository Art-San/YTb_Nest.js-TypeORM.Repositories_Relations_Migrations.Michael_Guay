import { PartialType } from '@nestjs/mapped-types'
import { CreateCommentDto } from './create-comment.dto'
import { CreateItemDto } from './create-item.dto'

export class UpdateItemDto {
	public: boolean
	comments: CreateCommentDto[]
}
// export class UpdateItemDto extends PartialType(CreateItemDto) {}
