import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import WikiPost from "./WikiPost";

@Table({
  tableName: "wiki_post_contributions",
  timestamps: false,
})
export default class WikiPostContribution extends Model {
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
  declare modificationHtmlRef: string;

  @ForeignKey(() => WikiPost)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: WikiPost,
      key: "id"
    },
    onDelete: "CASCADE",
  })
  declare wikiPostId: number;

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

  @BelongsTo(() => WikiPost)
  declare wikiPost: WikiPost;
};