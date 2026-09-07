import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "wiki_posts",
  timestamps: false,
})
export default class WikiPost extends Model {
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
  declare htmlRef: string;

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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  declare pendingApproval: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  declare archived: boolean;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  declare likes: number;
};