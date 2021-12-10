import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateCompanyDto } from './dto/create-company.dto'
import { Company } from './companies.model'

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company) private companyRepository: typeof Company) {
    }

    async create(dto: CreateCompanyDto) {
        return await this.companyRepository.create(dto)
    }

    async getAll() {
        return await this.companyRepository.findAll({include: {all: true}})
    }
}
