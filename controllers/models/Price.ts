import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "prices" })
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
  declare host: string;

  @Column({ type: DataType.NUMBER })
  declare priceLower?: number;

  @Column({ type: DataType.NUMBER })
  declare priceUpper?: number;
}