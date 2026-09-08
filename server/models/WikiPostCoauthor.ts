import { Model, Table, ForeignKey, Column, DataType } from "sequelize-typescript";
import { User } from "./User";
import WikiPost from "./WikiPost";

@Table({ tableName: "wiki_post_coauthors", timestamps: false })
export default class WikiPostCoauthor extends Model {
  @ForeignKey(() => WikiPost)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare wikiPostId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare userId: number;
};
