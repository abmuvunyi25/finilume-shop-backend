import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) {}

  async create(dto: CreateListingDto) {
    const listing = this.listingsRepository.create(dto);
    return this.listingsRepository.save(listing);
  }

  async findAll(options: { productId?: string; sort?: string; page?: number; limit?: number }) {
    const { productId, sort, page = 1, limit = 10 } = options;

    const qb = this.listingsRepository.createQueryBuilder('listing')
      .leftJoinAndSelect('listing.merchant', 'merchant')
      .leftJoinAndSelect('listing.product', 'product');

    if (productId) {
      qb.where('listing.productId = :productId', { productId });
    }

    // Sorting options
    if (sort === 'price_asc') qb.orderBy('listing.price', 'ASC');
    else if (sort === 'price_desc') qb.orderBy('listing.price', 'DESC');
    else if (sort === 'stock_desc') qb.orderBy('listing.stock', 'DESC');
    else qb.orderBy('listing.createdAt', 'DESC');

    qb.skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByProduct(productId: string) {
    return this.listingsRepository.find({
      where: { productId },
      relations: ['merchant'],
      order: { price: 'ASC' },
    });
  }

  async findOne(id: string) {
    return this.listingsRepository.findOne({
      where: { id },
      relations: ['product', 'merchant'],
    });
  }
}
