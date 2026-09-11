
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ScrollButton from "./ScrollButton";

describe("<ScrollButton />", () => {
  const callback = vi.fn();
  test("renders and clicks", async () => {
    render(
      <ScrollButton toTop={callback} />
    );
    const btn = await screen.findByTestId("top-btn");
    btn.click();
    expect(callback).toHaveBeenCalled();
  });
});