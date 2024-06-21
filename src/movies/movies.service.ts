import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie)
    private movieModel: typeof Movie,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const { name, genre, thumbnail } = createMovieDto;
    const newMovie = {
      id: uuidv4(),
      name,
      genre,
      thumbnail,
    };

    return this.movieModel.create(newMovie);
  }

  findAll() {
    return this.movieModel.findAll();
  }

  async findOne(id: string) {
    const movie = await this.movieModel.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const result = await this.movieModel.update(updateMovieDto, {
      where: { id },
    });

    if (result[0] == 0) {
      throw new NotFoundException();
    }

    const updatedMovie = await this.findOne(id);
    return updatedMovie;
  }

  async remove(id: string) {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException();
    }
    await movie.destroy();
    return { message: 'Success' };
  }
}
