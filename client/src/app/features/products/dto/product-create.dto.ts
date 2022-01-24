export interface ProductCreateDto {
  name: string;
  description: string;
  price: number;
  inStockQuantity: number;
  categoryId: string;
}
