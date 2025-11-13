import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  listingId: string;

  @ManyToOne(() => Listing, { eager: true })
  @JoinColumn({ name: 'listingId' })
  listing: Listing;

  @Column('int', { default: 1 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}