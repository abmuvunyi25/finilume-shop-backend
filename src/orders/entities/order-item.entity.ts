// src/orders/entities/order-item.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Order } from './order.entity';
  import { Product } from '../../products/entities/product.entity';
  import { Listing } from '../../listings/entities/listing.entity';
  
  @Entity('order_items')
  export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('uuid')
    orderId: string;
  
    @Column('uuid')
    productId: string;
  
    @Column('uuid', { nullable: true })
    listingId: string;
  
    @Column()
    title: string;
  
    @Column({ nullable: true })
    imageUrl: string;
  
    @Column('int')
    quantity: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice: number;
  
    @Column({ default: 'RWF' })
    currency: string;
  
    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: Order;
  
    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' })
    product: Product;
  
    @ManyToOne(() => Listing, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'listingId' })
    listing: Listing;
  }
  