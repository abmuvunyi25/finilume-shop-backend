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

  create(data: Partial<Listing>) {
    const listing = this.listingsRepository.create(data);
    return this.listingsRepository.save(listing);
  }

  findByProduct(productId: string) {
    return this.listingsRepository.find({
      where: { productId },
      relations: ['merchant'],
    });
  }

  findOne(id: string) {
    return this.listingsRepository.findOne({
      where: { id },
      relations: ['product', 'merchant'],
    });
  }
}