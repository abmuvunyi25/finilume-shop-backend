// src/merchants/entities/merchant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity';

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column('decimal', { precision: 3, scale: 1, default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  // One merchant → many listings
  @OneToMany(() => Listing, (listing) => listing.merchant)
  listings: Listing[];
  
}