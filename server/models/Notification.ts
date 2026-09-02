import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "notifications",
  timestamps: false,
})
export class Notification extends Model {
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
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare content: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  declare publishDate: Date;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  declare duration: number;
}