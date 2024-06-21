import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('customer/movies')
export class MoviesCustomerController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }
}
