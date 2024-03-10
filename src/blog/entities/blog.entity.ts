import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './likes.entity';
import { Paginated } from '../../common/pagination';

@ObjectType()
@Entity('blogs')
export class Blog {
  @Field(() => String, { description: 'Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({
    nullable: false,
    description: 'Title',
  })
  @Column({ nullable: false })
  title: string;

  @Field({
    nullable: false,
    description: 'slug',
  })
  @Index()
  @Column({ nullable: false })
  slug: string;

  @Field({
    nullable: true,
    description: 'Image',
  })
  @Column({ nullable: true })
  image: string;

  @Field(() => [String], {
    nullable: true,
    description: 'tags',
  })
  @Column({ type: 'jsonb', nullable: true, default: [] })
  tags: string[];

  @Field(() => [String], {
    nullable: true,
    description: 'internal tags',
  })
  @Column({ type: 'jsonb', nullable: true, default: [] })
  internalTags: string[];

  @Field({
    nullable: false,
    description: 'html content',
  })
  @Column({ nullable: false })
  htmlContent: string;

  @Field({
    nullable: false,
    description: 'content',
  })
  @Column({ nullable: false })
  content: string;

  @Field({
    nullable: false,
    description: 'short description',
  })
  @Column({ nullable: false })
  shortDescription: string;

  @Field(() => [String], {
    nullable: true,
    description: 'credits',
  })
  @Column({ type: 'jsonb', nullable: true, default: [] })
  credits: string[];

  @Field(() => [Comment], { description: 'Blog', nullable: 'itemsAndList' })
  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @Field(() => [Like], { description: 'Blog', nullable: 'itemsAndList' })
  @OneToMany(() => Like, (like) => like.blog)
  likes: Like[];

  @Field({
    nullable: false,
    description: 'publish',
  })
  @Column({ nullable: false, default: true })
  publish: boolean;

  @Field({
    nullable: false,
    description: 'status',
  })
  @Column({ nullable: false, default: true })
  status: boolean;

  @Field({ nullable: false, description: 'featured' })
  @Column({ nullable: false, default: false })
  featured: boolean;

  @Field({ nullable: false, description: 'time to read' })
  @Column({ nullable: false, default: 0 })
  timeToRead: number;

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

@ObjectType('PaginatedBlog')
export class PaginatedBlog extends Paginated(Blog) {}
