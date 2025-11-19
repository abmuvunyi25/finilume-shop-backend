// src/checkout/dto/checkout.dto.ts
import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CheckoutDto {
  @IsUUID()
  sessionId: string;

  @IsString()
  @IsOptional()
  customerName?: string;

  @IsString()
  @IsOptional()
  customerPhone?: string;

  @IsString()
  @IsOptional()
  customerEmail?: string;

  @IsString()
  @IsOptional()
  shippingAddress?: string;
}
