import { Injectable } from '@nestjs/common'
import { User } from './users.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getUserByEmail(email: string) {
        const user = this.userRepository.findOne({where: {email}})
        return user
    }

    async getAll() {
        return await this.userRepository.findAll({include: {all: true}})
    }
}
