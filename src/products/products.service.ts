import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find({ relations: ['listings'] });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['listings', 'listings.merchant'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);
    await this.productsRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);
    await this.productsRepository.delete(id);
    return product;
  }
}