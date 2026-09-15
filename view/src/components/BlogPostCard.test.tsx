import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { BlogPost } from "../types";
import BlogPostCard from "./BlogPostCard";

describe("<BlogPostCard />", () => {
  const post: BlogPost = {
    id: 0,
    date: "",
    likes: 20,
    adminId: 0,
    archived: false,
    title: "My post",
    html: ""
  };

  const callback = vi.fn();
  const archiveCallBack = vi.fn();

  test("renders and clicks with no archive button", async () => {
    render(
      <BlogPostCard
        post={post}
        index={239}
        onClick={callback}
      />
    );
    const element = screen.getByText("My post");
    expect(element).toBeDefined();
    const archiveBtn_nonExistent = screen.queryByTestId("archive-btn239");
    expect(archiveBtn_nonExistent).toBeNull();
  });

  test("renders and clicks with archive button", async () => {
    render(
      <BlogPostCard
        post={post}
        index={239}
        onClick={callback}
        onArchive={archiveCallBack}
      />
    );
    const element = screen.getByText("My post");
    expect(element).toBeDefined();
    const archiveBtn = await screen.findByTestId("archive-btn239");
    expect(archiveBtn).toBeDefined();
    archiveBtn.click();
    expect(archiveCallBack).toHaveBeenCalledTimes(1);
  });
});