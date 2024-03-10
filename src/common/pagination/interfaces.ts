export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginationResult<Entity> {
  results: Entity[];
  total: number;
  page?: number;
  limit?: number;
  previous?: string;
  next?: string;
}
