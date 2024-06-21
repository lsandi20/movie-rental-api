import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsAdminController } from './rentals-admin.controller';
import { Rental } from './entities/rental.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { RentalsCustomerController } from './rentals-customer.controller';

import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Module({
  imports: [SequelizeModule.forFeature([Rental, User, Movie])],
  controllers: [RentalsAdminController, RentalsCustomerController],
  providers: [RentalsService],
})
export class RentalsModule {}
