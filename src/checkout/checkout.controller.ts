// src/checkout/checkout.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  checkout(@Body() dto: CheckoutDto) {
    return this.checkoutService.checkout(dto);
  }
}
