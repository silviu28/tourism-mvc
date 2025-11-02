import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "comments",
  timestamps: false,
})
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare comment: string;

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

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  declare date: Date;

  @BelongsTo(() => User)
  declare user: User;
}