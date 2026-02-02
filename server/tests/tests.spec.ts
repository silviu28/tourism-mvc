import { User } from "../models/User";
import { Admin } from "../models/Admin";
import { Comment } from "../models/Comment";
import { Image } from "../models/Image";

jest.mock("../models/User");
jest.mock("../models/Admin");
jest.mock("../models/Comment");
jest.mock("../models/Image");

describe("Model logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call User.create with the correct data", async () => {
    (User.create as jest.Mock).mockResolvedValue({ id: 1, username: "mich" });

    const input = {
      username: "mich",
      passwordHash: "hash",
      email: "mich@email.com",
      notify: false
    };

    const user = await User.create(input);

    expect(User.create).toHaveBeenCalledWith(input);
    expect(user.username).toBe("mich");
  });

  it("should create a comment with the correct fields", async () => {
    const now = new Date();
    (Comment.create as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 2,
      comment: "unit comment",
      date: now,
    });

    const result = await Comment.create({
      userId: 2,
      comment: "unit comment",
      date: now,
    });

    expect(Comment.create).toHaveBeenCalledWith({
      userId: 2,
      comment: "unit comment",
      date: now,
    });
    expect(result.comment).toBe("unit comment");
  });

  it("should call Image.create when uploading", async () => {
    (Image.create as jest.Mock).mockResolvedValue({
      id: 1,
      src: "mockSrc"
    });

    const image = await Image.create({ src: "mockSrc" });

    expect(Image.create).toHaveBeenCalledWith({ src: "mockSrc" });
    expect(image.src).toBe("mockSrc");
  });

  it("should create an admin with a userId", async () => {
    (Admin.create as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 1
    });

    const admin = await Admin.create({ userId: 1 });

    expect(Admin.create).toHaveBeenCalledWith({ userId: 1 });
    expect(admin.userId).toBe(1);
  });

  it("should call Admin.destroy when User.destroy is called", async () => {
    (User.destroy as jest.Mock).mockResolvedValue(1);
    (Admin.destroy as jest.Mock).mockResolvedValue(1);

    await User.destroy({ where: { id: 1 } });
    await Admin.destroy({ where: { userId: 1 } });

    expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(Admin.destroy).toHaveBeenCalledWith({ where: { userId: 1 } });
  });
});
