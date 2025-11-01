import { Comment } from "../models/Comment";
import { Image } from "../models/Image";
import { User } from "../models/User";
import sequelize from "./testSequelizeConfig";

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Server IO", () => {
  beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  it("should sign up a user", async () => {
    const user = await User.create({
      username: "mich",
      passwordHash: "passwordHashLol",
      email: "mich@email.com"
    });

    expect(user.username).toBe("mich");
    expect(user.passwordHash).toBeDefined();
    expect(user.email).toBe("mich@email.com");
    expect(user.admin).toBeUndefined();
    expect(user.fullName).toBeUndefined();
  });

  it("should add and load comments", async () => {
    await Comment.create({
      userId: 1,
      comment: "this is a comment"
    });

    const comments = await Comment.findAll();

    expect(comments[0].id).toBeDefined();
    expect(comments[0].comment).toBe("this is a comment");
    expect(comments[0].userId).toBeDefined();
  });

  it("should add and load gallery images", async () => {
    await Image.create({
      src: "somePictureSrc"
    });

    const images = await Image.findAll();

    expect(images[0].id).toBeDefined();
    expect(images[0].src).toBe("somePictureSrc");
  });
});