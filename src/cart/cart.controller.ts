// cart.controller.ts
import { Controller, Post, Get, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('start')
  start() {
    return this.cartService.startSession();
  }

  @Post('items')
  add(@Body() dto: AddCartItemDto, @Query('sessionId') sessionId: string) {
    return this.cartService.addToCart(sessionId, dto);
  }

  @Get()
  getCart(@Query('sessionId') sessionId: string) {
    return this.cartService.findAll(sessionId);
  }

  @Patch('items/:id')
  update(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.cartService.updateQuantity(id, quantity);
  }

  @Delete('items/:id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }

  @Delete()
  clear(@Query('sessionId') sessionId: string) {
    return this.cartService.clear(sessionId);
  }
}
