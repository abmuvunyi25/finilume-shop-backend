// src/data-source.ts
import './load-env'; // ← ADD THIS LINE FIRST
import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { Merchant } from './merchants/entities/merchant.entity';
import { Listing } from './listings/entities/listing.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [Product, Cart, Merchant, Listing],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});