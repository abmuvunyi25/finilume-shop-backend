// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { config } from 'dotenv';
import { MerchantsModule } from './merchants/merchants.module';
import { ListingsModule } from './listings/listings.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppDataSource } from './data-source';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    CheckoutModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // ✅ serve /public folder
    }),
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

