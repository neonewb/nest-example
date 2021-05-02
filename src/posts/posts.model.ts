import { ApiProperty } from '@nestjs/swagger'
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface PostCreationAttr {
  title: string
  content: string
  userId: number
  image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({ example: 'Coding', description: 'Title' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string

  @ApiProperty({
    example: 'Coding is awesome!!!',
    description: 'Some text content'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  content: string

  @ApiProperty({ example: 'Code.jpg', description: 'Some image' })
  @Column({
    type: DataType.STRING
  })
  image: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @BelongsTo(() => User)
  roles: User[]
}
