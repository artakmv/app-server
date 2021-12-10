import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { SignInUserDto } from '../users/dto/sign-in-user.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/sign-in')
    login(@Body() userDto: SignInUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/sign-up')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Get('/auth')
    auth(@Req() req) {
        return this.authService.auth(req)
    }
}
