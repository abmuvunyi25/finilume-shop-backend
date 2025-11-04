import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // optional, makes PrismaService available everywhere without importing PrismaModule repeatedly
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
