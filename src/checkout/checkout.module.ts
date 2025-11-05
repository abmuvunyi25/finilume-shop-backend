// src/checkout/checkout.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Order } from '../orders/entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}