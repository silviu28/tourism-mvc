import { Table, Model, ForeignKey, Column, DataType, CreatedAt, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { BlogPostComment } from "./BlogPostComment";

@Table({
  tableName: "blog_post_comment_likes",
  timestamps: true,
  updatedAt: false,
})
class BlogPostCommentLike extends Model {
  @ForeignKey(() => BlogPostComment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  declare blogPostCommentId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  declare userId: number;

  @CreatedAt
  declare createdAt: Date;

  @BelongsTo(() => BlogPostComment)
  declare blogPostComment: BlogPostComment;

  @BelongsTo(() => User)
  declare user: User;
}

export default BlogPostCommentLike;