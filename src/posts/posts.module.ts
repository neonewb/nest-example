import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/users.model'
import { Post } from './posts.model'
import { FilesModule } from 'src/files/files.module'

@Module({
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
