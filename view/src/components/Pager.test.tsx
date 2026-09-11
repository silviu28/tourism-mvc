import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Pager from "./Pager";

describe("<Pager />", () => {
  const callback = vi.fn();

  test("renders", () => {
    render(
      <Pager
        state={{ pageNo: 0, totalPages: 0 }}
        onPageChange={callback}
      />
    );
    const element = screen.getByText("Page 0 of 0");
    expect(element).toBeDefined();
  });
});