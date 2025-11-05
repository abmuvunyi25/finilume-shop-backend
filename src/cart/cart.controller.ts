// src/cart/cart.controller.ts
import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  add(@Body('productId') productId: string, @Body('quantity') quantity?: number) {
    return this.cartService.addToCart(productId, quantity);
  }

  @Get()
  getCart() {
    return this.cartService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }

  @Delete()
  clear() {
    return this.cartService.clear();
  }
}