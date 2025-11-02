import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "admins",
  timestamps: false
})
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

  @BelongsTo(() => User)
  declare user: User;
}