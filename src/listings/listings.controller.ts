import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  create(@Body() dto: CreateListingDto) {
    return this.listingsService.create(dto);
  }

  @Get()
  getAll(
    @Query('productId') productId?: string,
    @Query('sort') sort?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.listingsService.findAll({ productId, sort, page: +page, limit: +limit });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }
}
