import { PartialType } from '@nestjs/mapped-types'
import { CreateItemDto } from './create-item.dto'

export class UpdateItemDto {
	public: boolean
}
// export class UpdateItemDto extends PartialType(CreateItemDto) {}
