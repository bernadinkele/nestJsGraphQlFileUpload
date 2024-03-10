import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { Blog } from './entities/blog.entity';
import { Like } from './entities/likes.entity';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from '../upload/upload.module';

@Module({
  providers: [BlogResolver, BlogService],
  imports: [TypeOrmModule.forFeature([Blog, Comment, Like]), UploadModule],
  exports: [BlogService],
})
export class BlogModule {}
