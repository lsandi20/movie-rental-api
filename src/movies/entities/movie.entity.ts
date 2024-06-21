import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'movies' })
export class Movie extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @Column
  genre: string;

  @Column
  thumbnail: string;
}
