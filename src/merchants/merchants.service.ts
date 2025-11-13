import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantsRepository: Repository<Merchant>,
  ) {}

  create(data: Partial<Merchant>) {
    const merchant = this.merchantsRepository.create(data);
    return this.merchantsRepository.save(merchant);
  }

  findAll() {
    return this.merchantsRepository.find();
  }

  findOne(id: string) {
    return this.merchantsRepository.findOne({ where: { id } });
  }
}