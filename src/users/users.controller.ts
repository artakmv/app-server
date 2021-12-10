import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Get()
    getAll() {
        return this.userService.getAll()
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }
}
