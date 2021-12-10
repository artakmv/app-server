import { Body, Controller, Get, Post } from '@nestjs/common'
import {CreateCompanyDto} from './dto/create-company.dto'
import {CompaniesService} from './companies.service'

@Controller('companies')
export class CompaniesController {
    constructor(private companyService: CompaniesService) {}

    @Post()
    createCompany(@Body() dto: CreateCompanyDto) {
       return  this.companyService.create(dto)
    }

    @Get()
    getAll() {
        return this.companyService.getAll()
    }
}
