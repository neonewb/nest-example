import { ApiProperty } from '@nestjs/swagger'
import { Table, Model, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript'
import { Post } from 'src/posts/posts.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface UserCreationAttr {
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string

  @ApiProperty({ example: true, description: 'Banned user or not' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  banned: boolean

  @ApiProperty({ example: 'Spam', description: 'Ban reason' })
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasMany(()=>Post)
  posts: Post[]
}
