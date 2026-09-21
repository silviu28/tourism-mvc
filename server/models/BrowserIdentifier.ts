import { Table, PrimaryKey, AutoIncrement, Column, DataType, Model } from "sequelize-typescript";

@Table({
  tableName: "browser_identifiers",
  timestamps: false,
})
export default class BrowserIdentifier extends Model {
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
  declare uuid: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  declare date: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare permissions: number;
}