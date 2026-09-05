import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "refresh_tokens",
  timestamps: false,
})
export default class RefreshToken extends Model {
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

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  declare expiresAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare token: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  declare remember: boolean;

  @BelongsTo(() => User)
  declare user: User;
};