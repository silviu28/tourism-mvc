
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import WikiPostCard from "./WikiPostCard";
import type { WikiPost } from "../types";

describe("<WikiPostCard />", () => {
  const post: WikiPost = {
    title: "The title",
    htmlRef: "",
    user: {
      id: 0,
      username: ""
    },
    coauthors: [],
    date: "",
    likes: 0
  };
  const callback = vi.fn();
  test("renders and clicks", async () => {
    render(
      <WikiPostCard
        post={post} 
        onClick={callback}
      />
    );
    const text = screen.getByText("The title");
    expect(text).toBeDefined();
    const card = await screen.findByTestId("wiki-post-card");
    card.click();
    expect(callback).toHaveBeenCalled();
  });
});