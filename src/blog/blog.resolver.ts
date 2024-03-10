import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Blog, PaginatedBlog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { PaginatedEntityInput } from '../common/pagination';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => Blog, { name: 'adminCreateBlog' })
  async createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return await this.blogService.create(createBlogInput);
  }

  @Query(() => PaginatedBlog, { name: 'adminBlogs' })
  async findAll(
    @Args('options') options?: PaginatedEntityInput,
  ): Promise<PaginatedBlog> {
    return await this.blogService.findAll(options);
  }

  @Query(() => Blog, { name: 'adminBlog' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.blogService.findOne(id);
  }

  @Mutation(() => Blog, { name: 'adminUpdateBlog' })
  async updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return await this.blogService.update(updateBlogInput);
  }

  @Mutation(() => Blog, { name: 'adminRemoveBlog' })
  async removeBlog(@Args('id', { type: () => String }) id: string) {
    return await this.blogService.remove(id);
  }
}
