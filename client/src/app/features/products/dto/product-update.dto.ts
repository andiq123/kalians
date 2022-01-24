export interface ProductUpdateDto {
  id?: string;
  name: string;
  description: string;
  price: number;
  inStockQuantity: number;
  categoryId: string;
}
