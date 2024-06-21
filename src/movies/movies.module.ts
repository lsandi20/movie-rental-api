import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesCustomerController } from './movies-customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './entities/movie.entity';
import { MoviesAdminController } from './movies-admin.controller';

@Module({
  imports: [SequelizeModule.forFeature([Movie])],
  controllers: [MoviesCustomerController, MoviesAdminController],
  providers: [MoviesService],
})
export class MoviesModule {}
