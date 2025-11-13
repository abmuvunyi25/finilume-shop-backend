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
      relations: ['listing', 'listing.product', 'listing.merchant'],
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const items = cartItems.map(item => ({
      listingId: item.listing.id,
      productId: item.listing.product.id,
      name: item.listing.product.name,
      price: parseFloat(item.listing.price as any),
      quantity: item.quantity,
      merchantId: item.listing.merchant.id,
      merchantName: item.listing.merchant.name,
    }));

    const itemsByMerchant = items.reduce((acc, item) => {
      const key = item.merchantName;
      if (!acc[key]) {
        acc[key] = { items: [], subtotal: 0 };
      }
      acc[key].items.push({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
      acc[key].subtotal += item.price * item.quantity;
      return acc;
    }, {} as Record<string, { items: any[]; subtotal: number }>);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = this.orderRepository.create({ items, total });
    await this.orderRepository.save(order);
    await this.cartRepository.clear();

    return {
      orderId: order.id,
      total,
      currency: 'RWF',
      itemsByMerchant,
    };
  }
}