import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @IsString({message: 'It must be a string'})
    @IsEmail({},{message: 'Incorrect email'})
    readonly email: string
    @IsString({message: 'It must be a string'})
    @Length(4, 16, {message: 'Password must be between 4 and 16 characters'})
    readonly password: string
    readonly phoneNumber: string
    readonly firstName: string
    readonly lastName: string
    readonly nickname: string
    readonly description: string
    readonly position: string
}
