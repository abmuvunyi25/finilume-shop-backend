// dto/add-cart-item.dto.ts
import { IsUUID, IsInt, Min } from 'class-validator';

export class AddCartItemDto {
  @IsUUID()
  listingId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
