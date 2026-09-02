import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from "sequelize-typescript";
import { BlogPost } from "./BlogPost";
import { User } from "./User";

@Table({
  tableName: "blog_likes",
  timestamps: true,
  updatedAt: false,
})
class BlogLike extends Model {
  @ForeignKey(() => BlogPost)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  declare blogPostId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  declare userId: number;

  @CreatedAt
  declare createdAt: Date;

  @BelongsTo(() => BlogPost)
  declare blogPost: BlogPost;

  @BelongsTo(() => User)
  declare user: User;
}

export default BlogLike;