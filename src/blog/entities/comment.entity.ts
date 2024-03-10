import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from './blog.entity';
import { Like } from './likes.entity';

@ObjectType()
@Entity('blogComments')
export class Comment {
  @Field(() => String, { description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({
    nullable: false,
    description: 'text',
  })
  @Column({ nullable: false })
  text: string;

  @Field(() => [String], {
    nullable: true,
    description: 'images',
  })
  @Column({ type: 'jsonb', nullable: true, default: [] })
  images: string[];

  @Field(() => Blog, { description: 'Blog' })
  @ManyToOne(() => Blog, (blog) => blog.comments)
  @JoinColumn()
  blog: Blog;

  @Field(() => [Comment], { description: 'replies', nullable: 'itemsAndList' })
  @OneToMany(() => Comment, (comment) => comment.parent, { nullable: true })
  replies: Comment[];

  @Field(() => Comment, { description: 'parent', nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  @JoinColumn()
  parent: Comment;

  @Field(() => [Like], { description: 'like' })
  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column()
  @DeleteDateColumn()
  deletedAt: Date;
}
