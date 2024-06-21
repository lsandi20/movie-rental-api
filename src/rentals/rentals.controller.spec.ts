import { Test, TestingModule } from '@nestjs/testing';
import { RentalsAdminController } from './rentals-admin.controller';
import { RentalsService } from './rentals.service';

describe('RentalsController', () => {
  let controller: RentalsAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalsAdminController],
      providers: [RentalsService],
    }).compile();

    controller = module.get<RentalsAdminController>(RentalsAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
