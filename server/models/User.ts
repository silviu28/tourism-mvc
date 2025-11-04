import { AutoIncrement, Column, DataType, HasMany, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Comment } from "./Comment";
import { Admin } from "./Admin";

@Table({
  tableName: "users",
  timestamps: false
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
    allowNull: false,
    validate: {
      len: [3, 18],
      isAlphanumeric: true
    }
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare passwordHash: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  })
  declare email: string;

  @Column({
    type: DataType.DATEONLY,
    validate: {
      isDate: true
    }
  })
  declare birthdate: string;

  @Column({ type: DataType.STRING })
  declare fullName?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  declare notify: boolean;

  @HasMany(() => Comment)
  declare comments: Comment[];

  @HasOne(() => Admin)
  declare admin?: Admin;
}