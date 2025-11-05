// src/checkout/checkout.controller.ts
import { Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Post()
  checkout() {
    return this.checkoutService.checkout();
  }
}