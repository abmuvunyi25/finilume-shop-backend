import { Controller, Get, Post, Body } from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Post()
  create(@Body() data: any) {
    return this.merchantsService.create(data);
  }

  @Get()
  findAll() {
    return this.merchantsService.findAll();
  }
}