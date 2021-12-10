import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/users.model'
import { UsersService } from '../users/users.service'
import { SignInUserDto } from '../users/dto/sign-in-user.dto'

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async login(userDto: SignInUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id}
        return {
            token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                phoneNumber: user.phoneNumber,
                firstName: user.firstName,
                lastName: user.lastName,
                nickname: user.nickname,
                description: user.description,
                position: user.position,
                companies: user.companies
            }
        }
    }

    private async validateUser(userDto: SignInUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }

    async auth(req) {
        const user = await this.userService.getUserByEmail(req.user.email)
        return this.generateToken(user)
    }
}
