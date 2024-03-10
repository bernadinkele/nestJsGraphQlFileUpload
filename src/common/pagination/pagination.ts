import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { IPaginationResult } from './interfaces';
import { Type } from '@nestjs/common';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@InputType()
export class SortingInput {
  @Field(() => String)
  column: string;

  @IsIn(['ASC', 'DESC'])
  @Field(() => String)
  order: 'ASC' | 'DESC';
}

@InputType()
export class FilterInput {
  @Field()
  column: string;

  @Field()
  value: string;
}

@InputType()
export class PaginatedEntityInput {
  @Field(() => PaginationInput)
  pagination: PaginationInput;

  @Field(() => SortingInput, { nullable: true })
  sorting?: SortingInput;

  @Field(() => [FilterInput], { nullable: 'itemsAndList' })
  filters?: FilterInput[];

  @Field(() => FilterInput, { nullable: true })
  search?: FilterInput;
}

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: 'items' })
    public results: T[];

    @Field(() => Int)
    public pageTotal: number;

    @Field(() => Int)
    public total: number;

    @Field(() => Int, { nullable: true })
    public pageCount?: number;

    @Field({ nullable: true })
    hasNextPage?: boolean;
  }
  return PaginatedType;
}

export class Pagination<Entity> {
  public results: Entity[];

  public pageTotal: number;

  public total: number;

  public hasNextPage: boolean;

  public pageCount: number;

  constructor(paginationResult: IPaginationResult<Entity>) {
    const { results, total, page, limit } = paginationResult;
    this.results = results;
    this.pageTotal = results.length;
    this.total = total;
    this.hasNextPage = limit
      ? this.pageTotal > 0 && page * limit < total
      : false;
    this.pageCount = limit ? Math.floor(this.total / limit) : 1;
    this.pageCount = limit
      ? this.total % limit > 0
        ? this.pageCount + 1
        : this.pageCount
      : 1;
  }
}

export function calcSkippedItems(page: number, limit: number) {
  const pageNumber = Math.abs(page) <= 1 ? 1 : Math.abs(page); // The first page will always be 1
  const skippedItemsCount: number = (pageNumber - 1) * limit;

  return skippedItemsCount;
}
