// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async addToCart(productId: string, quantity: number = 1) {
    const existing = await this.cartRepository.findOne({ where: { productId } });
    if (existing) {
      existing.quantity += quantity;
      return this.cartRepository.save(existing);
    }
    const cart = this.cartRepository.create({ productId, quantity });
    return this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find({ relations: ['product'] });
  }

  async remove(id: string) {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) throw new Error('Not found');
    await this.cartRepository.delete(id);
    return cart;
  }

  clear() {
    return this.cartRepository.clear();
  }
}