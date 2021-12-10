import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { User } from '../users/users.model'
import {Company} from './companies.model'

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [
      SequelizeModule.forFeature([User, Company])
  ]
})

export class CompaniesModule {}
