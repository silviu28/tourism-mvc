import { Table, Model, ForeignKey, Column, DataType, CreatedAt, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import WikiPost from "./WikiPost";

@Table({
  tableName: "wiki_post_likes",
  timestamps: true,
  updatedAt: false,
})
export default class WikiPostLike extends Model {
  @ForeignKey(() => WikiPost)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  declare wikiPostId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  declare userId: number;

  @BelongsTo(() => WikiPost)
  declare wikiPost: WikiPost;

  @BelongsTo(() => User)
  declare user: User;

  @CreatedAt
  declare createdAt: Date;
}