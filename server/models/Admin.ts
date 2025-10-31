import { AutoIncrement, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey } from "sequelize-typescript";
import { User } from "./User";

export class Admin extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    },
    onDelete: "CASCADE",
  })
  declare userId: number;

  @HasOne(() => User)
  declare user: User;
}