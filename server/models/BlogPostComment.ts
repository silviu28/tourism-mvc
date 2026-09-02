import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { BlogPost } from "./BlogPost";

@Table({
  tableName: "blog_post_comments",
  timestamps: false,
})
export class BlogPostComment extends Model {
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

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  declare likes: number;

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

  @ForeignKey(() => BlogPost)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: BlogPost,
      key: "id"
    },
    onDelete: "CASCADE"
  })
  declare blogPostId: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  declare date: Date;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => BlogPost)
  declare blogPost: BlogPost;
}