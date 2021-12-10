import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Company} from '../companies/companies.model'

interface UserCreationAttrs {
    email: string
    password: string
    phoneNumber: string
    firstName: string
    lastName: string
    nickname: string
    description: string
    position: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @Column({type: DataType.STRING, allowNull: false})
    phoneNumber: string

    @Column({type: DataType.STRING, allowNull: false})
    firstName: string

    @Column({type: DataType.STRING, allowNull: false})
    lastName: string

    @Column({type: DataType.STRING, allowNull: false})
    nickname: string

    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @Column({type: DataType.STRING, allowNull: false})
    position: string

    @HasMany(() => Company)
    companies: Company[]
}
