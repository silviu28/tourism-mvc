import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentSection from "./CommentSection";
import type { CommentData } from "../types";

describe("<CommentSection />", () => {
  const comments: CommentData[] = [
    {
      id: 1,
      user: {
        username: "john"
      },
      comment: "Comment 1"
    },
    {
      id: 2,
      user: {
        username: "hello"
      },
      comment: "Comment 2"
    },
    {
      id: 3,
      user: {
        username: "yay"
      },
      comment: "Comment 3"
    }
  ];

  const callback = vi.fn();
  const callback_ = vi.fn();

  test("renders all items", () => {
    render(
      <CommentSection
        comments={comments}
        user={{}}
        onLikeComment={callback_}
        onComment={callback}
      />
    );
    const elements = screen.queryAllByTestId("comm");
    expect(elements).toHaveLength(3);
  });
});