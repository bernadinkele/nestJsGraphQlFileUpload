import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { utils } from '../utils';
import { UploadService } from '../upload/upload.service';
import { JSDOM } from 'jsdom';
import {
  calcSkippedItems,
  PaginatedEntityInput,
  Pagination,
} from '../common/pagination';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private uploadService: UploadService,
  ) {}

  async create(createBlogInput: CreateBlogInput) {
    const preparedBlogInput = await this.prepareBlogInput(createBlogInput);
    return await this.blogRepository.save(preparedBlogInput);
  }

  async update(updateBlogInput: UpdateBlogInput) {
    const preparedBlogInput = await this.prepareBlogInput(updateBlogInput);
    await this.blogRepository.save(preparedBlogInput);
    return await this.findOne(updateBlogInput.id);
  }

  async findAll(options: PaginatedEntityInput) {
    const {
      pagination: { limit, page },
      sorting: { column, order } = { column: 'createdAt', order: 'DESC' },
      filters = [],
    } = options;
    const skippedItemsCount = calcSkippedItems(page, limit);
    const [results, total] = await this.blogRepository.findAndCount({
      where: { ...utils.getFilters(filters) },
      skip: skippedItemsCount,
      take: limit,
      order: { [column]: order },
    });
    return new Pagination<Blog>({
      page,
      limit,
      results,
      total,
    });
  }

  async findOne(id: string) {
    return await this.blogRepository.findOneOrFail({
      where: { id },
      relations: ['cities', 'countries', 'places'],
    });
  }

  async remove(id: string) {
    return await this.blogRepository.softDelete({ id });
  }

  calculateReadTime(content: string): number {
    const words = content.split(' ').length;
    return Math.ceil(words / 200);
  }

  async prepareBlogInput(blogPayload: CreateBlogInput | UpdateBlogInput) {
    const { userId, cityIds, countryIds, placeIds, imageFile, ...blogInput } =
      blogPayload;
    blogInput.slug = utils.slugify(blogInput.title);
    if (blogInput.htmlContent) {
      const dom = new JSDOM();
      const parser = new dom.window.DOMParser();
      const doc = parser.parseFromString(blogInput.htmlContent, 'text/html');
      blogInput.content = doc.body.textContent || '';
    }
    if (!blogInput.shortDescription) {
      blogInput.shortDescription = blogInput.content.slice(0, 300);
    }
    if (imageFile) {
      const image = await imageFile;
      blogInput.image = await this.uploadService.uploadToFirebase({
        file: image,
        path: `blog`,
        fileName: blogInput.slug,
      });
    }

    blogInput.timeToRead = this.calculateReadTime(blogInput.content);
    return blogInput;
  }
}
