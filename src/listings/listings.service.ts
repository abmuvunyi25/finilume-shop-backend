import { Injectable } from '@nestjs/common';
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

  async findAll() {
    return this.listingsRepository.find({
      relations: ['merchant', 'product'],
    });  // FIXED: Use listingsRepository instead of prisma
  }

  async findByProduct(productId: string) {
    return this.listingsRepository.find({
      where: { product: { id: productId } },
      relations: ['merchant'],
    });
  }

  async findOne(id: string) {
    return this.listingsRepository.findOne({
      where: { id },
      relations: ['product', 'merchant'],
    });
  }
}