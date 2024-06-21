import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'users' })
export class User extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @Column
  role: string;
}
