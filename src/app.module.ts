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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      ssl: { rejectUnauthorized: false },
    }),
    ProductsModule,
    MerchantsModule,
    ListingsModule,
    CartModule,
    CheckoutModule,
  ],
})
export class AppModule {}