import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';

@Table({ modelName: 'rentals' })
export class Rental extends Model {
  @Column({ primaryKey: true })
  id: string;

  @ForeignKey(() => Movie)
  @Column
  movie_id: string;

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @BelongsTo(() => Movie)
  movie;

  @BelongsTo(() => User)
  user;

  @Column
  rental_start: Date;

  @Column
  rental_end: Date;
}
