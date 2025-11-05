// src/cart/entities/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  productId: string;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}