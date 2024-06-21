import { Test, TestingModule } from '@nestjs/testing';
import { MoviesCustomerController } from './movies-customer.controller';
import { MoviesService } from './movies.service';

describe('MoviesCustomerController', () => {
  let controller: MoviesCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesCustomerController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesCustomerController>(MoviesCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
