// src/listings/entities/listing.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Merchant } from '../../merchants/entities/merchant.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @Column({ default: '3-5 days' })
  shipping: string;

  @CreateDateColumn()
  createdAt: Date;

  // Foreign key columns
  @Column('uuid')
  productId: string;

  @Column('uuid')
  merchantId: string;

  // Relations
  @ManyToOne(() => Product, (product) => product.listings, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Merchant, (merchant) => merchant.listings, { onDelete: 'CASCADE' })
  merchant: Merchant;
}