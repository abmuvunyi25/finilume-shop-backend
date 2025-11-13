// src/listings/listings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) {}

  async create(data: any) {
    const listing = this.listingsRepository.create(data);
    return this.listingsRepository.save(listing);
  }

  // FIXED: Use 'product' relation, not 'productId'
  async findByProduct(productId: string) {
    return this.listingsRepository.find({
      where: { product: { id: productId } }, // ← CORRECT
      relations: ['merchant', 'product'],
    });
  }

  async findOne(id: string) {
    return this.listingsRepository.findOne({
      where: { id },
      relations: ['product', 'merchant'],
    });
  }
}