// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ListingsModule } from '../listings/listings.module'; // ← Keep

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]), // Cart repo
    ListingsModule, // ← Now exports TypeOrmModule → ListingRepository available
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}