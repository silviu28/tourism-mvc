import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "prices",
  timestamps: false
})
export class Price extends Model {
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
  declare country: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  declare isAvailable: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare travelHost: string;

  @Column({ type: DataType.FLOAT })
  declare priceLower?: number;

  @Column({ type: DataType.FLOAT })
  declare priceUpper?: number;
}