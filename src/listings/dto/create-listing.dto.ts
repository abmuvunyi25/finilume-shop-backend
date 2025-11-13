import { IsUUID, IsNumber, Min, IsInt, IsString } from 'class-validator';

export class CreateListingDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  merchantId: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsString()
  shipping?: string;
}