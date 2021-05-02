import { ApiProperty } from '@nestjs/swagger'
import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { UserRoles } from './user-roles.model'

interface RoleCreationAttr {
  role: string
  description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({ example: 'ADMIN', description: 'Meaning of unique role' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  role: string

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}
