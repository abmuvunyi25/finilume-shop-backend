import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Merchant } from '../../merchants/entities/merchant.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: string;

  @ManyToOne(() => Merchant)
  @JoinColumn({ name: 'merchantId' })
  merchant: Merchant;

  @Column()
  merchantId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @Column({ default: '3-5 days' })
  shipping: string;

  @CreateDateColumn()
  createdAt: Date;
}