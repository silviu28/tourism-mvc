import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("<Alert />", () => {
  test("renders", () => {
    render(
      <Alert
        title={"Title"}
        content={"Content"}
        error={false}
      />
    );
    const element = screen.queryByTestId("alert");
    expect(element).toBeDefined();
    const title = screen.queryByText("Title");
    expect(title).toBeDefined();
    const content = screen.queryByText("Content");
    expect(content).toBeDefined();
  });
});