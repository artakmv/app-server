import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { User } from './users/users.model'
import { AuthModule } from './auth/auth.module'
import { CompaniesModule } from './companies/companies.module'
import { Company } from './companies/companies.model'
import { AuthMiddleware } from './middleware/auth.middleware'

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Company],
            autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        CompaniesModule
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: 'auth/auth', method: RequestMethod.GET })
    }
}
