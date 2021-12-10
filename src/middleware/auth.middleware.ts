import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt'

declare module 'express' {
    export interface Request {
        user: any
    }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {
    }
    use(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            return next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                throw new UnauthorizedException({message: 'User not logged in'})
            }
            const user = this.jwtService.verify(token)
            req.user = user
            next()
        } catch (e) {
            throw new UnauthorizedException({message: 'User not logged in'})
        }
    }
}
