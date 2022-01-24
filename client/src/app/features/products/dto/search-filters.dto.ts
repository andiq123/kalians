export class SearchFiltersDto {
  name?: string;
  category?: string;
  limit?: number;
  offset?: number;
  
  constructor(data: {
    name?: string;
    category?: string;
    limit?: number;
    offset?: number;
  }) {
    this.name = data.name;
    this.category = data.category;
    this.limit = data.limit;
    this.offset = data.offset;
  }
}
