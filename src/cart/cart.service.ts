// cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Listing } from '../listings/entities/listing.entity';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) {}

  startSession() {
    return { sessionId: uuid() };
  }

  async addToCart(sessionId: string, dto: AddCartItemDto) {
    const listing = await this.listingsRepository.findOne({ where: { id: dto.listingId } });
    if (!listing) throw new NotFoundException('Listing not found');

    const existing = await this.cartRepository.findOne({ where: { listingId: dto.listingId, sessionId } });
    if (existing) {
      existing.quantity += dto.quantity;
      return this.cartRepository.save(existing);
    }

    const cart = this.cartRepository.create({ ...dto, sessionId });
    return this.cartRepository.save(cart);
  }

  async findAll(sessionId: string) {
    const items = await this.cartRepository.find({
      where: { sessionId },
      relations: ['listing', 'listing.product', 'listing.merchant'],
    });

    const total = items.reduce((sum, item) => sum + Number(item.listing.price) * item.quantity, 0);

    return { items, total };
  }

  async updateQuantity(id: string, quantity: number) {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) throw new NotFoundException('Cart item not found');
    cart.quantity = quantity;
    return this.cartRepository.save(cart);
  }

  async remove(id: string) {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) throw new NotFoundException('Cart item not found');
    await this.cartRepository.delete(id);
    return cart;
  }

  async clear(sessionId: string) {
    await this.cartRepository.delete({ sessionId });
    return { message: 'Cart cleared' };
  }
}
