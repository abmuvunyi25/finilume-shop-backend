import { Controller, Post, Body } from '@nestjs/common';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Post()
  create(@Body() data: any) {
    return this.listingsService.create(data);
  }
}