// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Listing } from '../listings/entities/listing.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Listing) // ← Now available via ListingsModule
    private listingsRepository: Repository<Listing>,
  ) {}

  async addToCart(listingId: string, quantity: number = 1) {
    const listing = await this.listingsRepository.findOne({ where: { id: listingId } });
    if (!listing) throw new NotFoundException('Listing not found');

    const existing = await this.cartRepository.findOne({ where: { listingId } });
    if (existing) {
      existing.quantity += quantity;
      return this.cartRepository.save(existing);
    }

    const cart = this.cartRepository.create({ listingId, quantity });
    return this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find({ relations: ['listing', 'listing.product', 'listing.merchant'] });
  }

  async remove(id: string) {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) throw new NotFoundException('Cart item not found');
    await this.cartRepository.delete(id);
    return cart;
  }

  clear() {
    return this.cartRepository.clear();
  }
}