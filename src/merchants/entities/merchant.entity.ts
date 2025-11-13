import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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
}