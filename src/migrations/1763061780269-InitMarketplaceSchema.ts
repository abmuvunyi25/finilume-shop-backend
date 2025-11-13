// src/migrations/1763061780269-InitMarketplaceSchema.ts
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitMarketplaceSchema1763061780269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Merchants
    await queryRunner.createTable(
      new Table({
        name: 'merchants',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'name', type: 'varchar', isUnique: true },
          { name: 'logoUrl', type: 'varchar', isNullable: true },
          { name: 'rating', type: 'decimal', precision: 3, scale: 1, default: 0 },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    // 2. Products
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'name', type: 'varchar' },
          { name: 'description', type: 'text' },
          { name: 'imageUrl', type: 'varchar' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    // 3. Listings
    await queryRunner.createTable(
      new Table({
        name: 'listings',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'productId', type: 'uuid' },
          { name: 'merchantId', type: 'uuid' },
          { name: 'price', type: 'decimal', precision: 10, scale: 2 },
          { name: 'stock', type: 'int' },
          { name: 'shipping', type: 'varchar', default: "'3-5 days'" },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey('listings', new TableForeignKey({
      columnNames: ['productId'],
      referencedTableName: 'products',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));

    await queryRunner.createForeignKey('listings', new TableForeignKey({
      columnNames: ['merchantId'],
      referencedTableName: 'merchants',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));

    // 4. Cart
    await queryRunner.createTable(
      new Table({
        name: 'cart',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'listingId', type: 'uuid' },
          { name: 'quantity', type: 'int', default: 1 },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey('cart', new TableForeignKey({
      columnNames: ['listingId'],
      referencedTableName: 'listings',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart');
    await queryRunner.dropTable('listings');
    await queryRunner.dropTable('products');
    await queryRunner.dropTable('merchants');
  }
}
