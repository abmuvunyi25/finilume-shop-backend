import { Controller, Post, Body, Get } from '@nestjs/common';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}  // FIXED: 'listingsService' (plural)

  @Post()
  create(@Body() data: any) {
    return this.listingsService.create(data);  // FIXED: 'listingsService' (plural)
  }

  @Get()
  getAll() {
    return this.listingsService.findAll();  // FIXED: 'listingsService' (plural)
  }
}