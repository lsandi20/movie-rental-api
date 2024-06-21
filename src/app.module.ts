import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { MoviesModule } from './movies/movies.module';
import { RentalsModule } from './rentals/rentals.module';
import { Movie } from './movies/entities/movie.entity';
import { Rental } from './rentals/entities/rental.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'movie_rental_db',
      models: [User, Movie, Rental],
    }),
    UsersModule,
    MoviesModule,
    RentalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
