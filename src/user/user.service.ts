import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: UserRepository
	) {}

	async create(user: User): Promise<User> {
		const userNew = this.userRepository.save(user)
		// return this.userRepository.save(user)
		return userNew
	}

	// async findOne(username: string): Promise<User | undefined> {
	// 	return this.userRepository.findOne({ username })
	// }
	// async findOne(username: string) {
	// 	return username
	// }
}
