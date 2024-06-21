import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';
import { v4 as uuidv4 } from 'uuid';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class RentalsService {
  constructor(
    @InjectModel(Rental)
    private rentalModel: typeof Rental,
    @InjectModel(Movie)
    private movieModel: typeof Movie,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createRentalDto: CreateRentalDto) {
    const { movie_id, user_id, rental_start, rental_end } = createRentalDto;
    const newRental = {
      id: uuidv4(),
      movie_id,
      user_id,
      rental_start,
      rental_end,
    };

    const movie = await this.movieModel.findOne({ where: { id: movie_id } });
    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    const user = await this.userModel.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (user.role !== 'customer') {
      throw new BadRequestException('user must be customer');
    }

    // validate currently rented movie
    const currentRent = await this.rentalModel.findOne({
      where: {
        movie_id,
        rental_end: {
          [Op.gte]: rental_start,
        },
      },
    });

    if (currentRent) {
      throw new BadRequestException('movie currently rented');
    }

    if (rental_start >= rental_end) {
      throw new BadRequestException(
        'rental start date time should not ahead of rental end date time',
      );
    }

    await this.rentalModel.create(newRental);

    return this.findOne(newRental.id);
  }

  findAll() {
    return this.rentalModel.findAll({
      include: [{ model: Movie }, { model: User }],
    });
  }

  async findOne(id: string) {
    const rental = await this.rentalModel.findOne({
      where: { id },
      include: [{ model: Movie }, { model: User }],
    });
    if (!rental) {
      throw new NotFoundException();
    }
    return rental;
  }

  async update(id: string, updateRentalDto: UpdateRentalDto) {
    const { rental_start, rental_end } = updateRentalDto;
    if (rental_start > rental_end) {
      throw new BadRequestException(
        'rental start date should not ahead of rental end date',
      );
    }

    const result = await this.rentalModel.update(updateRentalDto, {
      where: { id },
    });

    if (result[0] == 0) {
      throw new NotFoundException();
    }

    const updatedRental = await this.findOne(id);
    return updatedRental;
  }

  async remove(id: string) {
    const rental = await this.findOne(id);
    if (!rental) {
      throw new NotFoundException();
    }
    await rental.destroy();
    return { message: 'Success' };
  }
}
