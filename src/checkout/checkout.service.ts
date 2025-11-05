// src/checkout/checkout.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async checkout() {
    const cartItems = await this.cartRepository.find({
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const items = cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: parseFloat(item.product.price as any),
      quantity: item.quantity,
    }));

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = this.orderRepository.create({
      items,
      total,
    });

    await this.orderRepository.save(order);
    await this.cartRepository.clear();

    return { orderId: order.id, total, items };
  }
}