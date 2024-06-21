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

@Injectable()
export class RentalsService {
  constructor(
    @InjectModel(Rental)
    private rentalModel: typeof Rental,
  ) {}

  create(createRentalDto: CreateRentalDto) {
    const { movie_id, user_id, rental_start, rental_end } = createRentalDto;
    const newRental = {
      id: uuidv4(),
      movie_id,
      user_id,
      rental_start,
      rental_end,
    };

    if (rental_start > rental_end) {
      throw new BadRequestException(
        'rental start date should not ahead of rental end date',
      );
    }

    return this.rentalModel.create(newRental);
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
