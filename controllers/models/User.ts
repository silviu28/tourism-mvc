import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({
  tableName: "users",
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare id: number;

  @Unique
  @Column({
    type: DataType.STRING(18),
    allowNull: false
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare passwordHash: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare email: string;

  @Column({ type: DataType.DATEONLY })
  declare birthdate: string;

  @Column({ type: DataType.STRING })
  declare fullName?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  declare notify: boolean;
}
