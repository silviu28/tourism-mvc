import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Admin } from "./Admin";

@Table({
  tableName: "blog_posts",
  timestamps: false,
})
export class BlogPost extends Model {
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
    allowNull: true
  })
  declare description?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare html: string;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Admin,
      key: "id"
    },
    onDelete: "CASCADE",
  })
  declare adminId: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  declare date: Date;

  @BelongsTo(() => Admin)
  declare admin: Admin;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  declare archived: boolean;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  declare likes: number;
};