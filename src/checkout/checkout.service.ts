// src/checkout/checkout.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async checkout(dto: CheckoutDto) {
    const { sessionId, customerName, customerPhone, customerEmail, shippingAddress } = dto;

    // Get cart items for this session
    const cartItems = await this.cartRepository.find({
      where: { sessionId },
      relations: ['listing', 'listing.product', 'listing.merchant'],
    });

    if (cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.listing.price) * item.quantity,
      0,
    );

    // Create order
    const order = this.orderRepository.create({
      sessionId,
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      totalAmount: total,
      currency: 'RWF',
      status: 'PENDING',
    });
    await this.orderRepository.save(order);

    // Create order items linked to this order
    const orderItems = cartItems.map((item) =>
      this.orderItemRepository.create({
        orderId: order.id,
        productId: item.listing.product.id,
        listingId: item.listing.id,
        title: item.listing.product.name,
        imageUrl: item.listing.product.imageUrl,
        quantity: item.quantity,
        unitPrice: Number(item.listing.price),
        currency: 'RWF',
      }),
    );
    await this.orderItemRepository.save(orderItems);

    // Clear cart for this session only
    await this.cartRepository.delete({ sessionId });

    // Reload order with items safely
    const savedOrder = await this.orderRepository.findOneOrFail({
      where: { id: order.id },
      relations: ['items'],
    });

    return {
      orderId: savedOrder.id,
      total: savedOrder.totalAmount,
      currency: savedOrder.currency,
      items: savedOrder.items,
    };
  }
}
