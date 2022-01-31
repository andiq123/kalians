export interface CartSearchDto {
  id?: number;

  phoneNumber?: string;

  nume?: string;

  date?: Date;

  status?: string;

  limit: number;

  offset: number;
}
