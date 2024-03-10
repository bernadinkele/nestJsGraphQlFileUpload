import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
@InputType()
export class CreateBlogInput {
  @Field({
    nullable: false,
    description: 'Title',
  })
  title: string;

  @Field({
    nullable: true,
    description: 'slug',
  })
  slug: string;

  @Field({
    nullable: true,
    description: 'Image',
  })
  image: string;

  @Field(() => [String], {
    nullable: true,
    description: 'tags',
  })
  tags: string[];

  @Field(() => [String], {
    nullable: true,
    description: 'internal tags',
  })
  internalTags: string[];

  @Field({
    nullable: false,
    description: 'html content',
  })
  htmlContent: string;

  @Field({
    nullable: true,
    description: 'content',
  })
  content: string;

  @Field({
    nullable: true,
    description: 'short description',
  })
  shortDescription: string;

  @Field(() => [String], {
    nullable: true,
    description: 'credits',
  })
  credits: string[];

  @Field({
    nullable: false,
    description: 'publish',
  })
  publish: boolean;

  @Field({
    nullable: false,
    description: 'status',
  })
  status: boolean;

  @Field({ nullable: false, description: 'featured' })
  featured: boolean;

  @Field(() => GraphQLUpload, {
    nullable: true,
    description: 'Images file',
  })
  imageFile: Upload;

  @Field(() => [String], {
    nullable: true,
    description: 'Cities',
  })
  cityIds: string[];

  @Field(() => [String], {
    nullable: true,
    description: 'Places',
  })
  placeIds: string[];

  @Field(() => [String], {
    nullable: true,
    description: 'Cities',
  })
  countryIds: string[];

  @Field(() => String, {
    nullable: true,
    description: 'User',
  })
  userId: string;

  timeToRead: number;
}
