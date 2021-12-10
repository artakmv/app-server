import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './users.model'
import { AuthModule } from '../auth/auth.module'
import { Company } from '../companies/companies.model'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Company]),
      forwardRef(() => AuthModule)
  ],
    exports: [UsersService]
})
export class UsersModule {}
