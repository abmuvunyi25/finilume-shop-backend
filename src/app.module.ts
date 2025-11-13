// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { config } from 'dotenv';
import { MerchantsModule } from './merchants/merchants.module';
import { ListingsModule } from './listings/listings.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: false,
    }),
    ProductsModule,
    CartModule,
    CheckoutModule,
    MerchantsModule, 
    ListingsModule,
  ],
})
export class AppModule {}