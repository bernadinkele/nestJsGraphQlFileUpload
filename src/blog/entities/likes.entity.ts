import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from './blog.entity';
import { Comment } from './comment.entity';

@ObjectType()
@Entity('blogCommentLikes')
export class Like {
  @Field(() => String, { description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Blog, { description: 'Blog' })
  @ManyToOne(() => Blog, (blog) => blog.likes)
  @JoinColumn()
  blog: Blog;

  @Field(() => Comment, { description: 'Comment' })
  @ManyToOne(() => Comment, (comment) => comment.likes)
  @JoinColumn()
  comment: Comment;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
