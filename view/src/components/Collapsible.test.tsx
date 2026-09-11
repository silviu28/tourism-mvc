import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Collapsible from "./Collapsible";

describe("<Collapsible />", () => {
  test("renders", () => {
    render(
      <Collapsible>
        <p data-test-id="some-content">Some content to render...</p>
      </Collapsible>
    );
    const element = screen.queryByTestId("collapsible");
    expect(element).toBeDefined();
  });

  test("toggles and untoggles", () => {
    render(
      <Collapsible>
        <p data-test-id="some-content">Some content to render...</p>
      </Collapsible>
    );
    const element = screen.queryByTestId("collapsible");
    const content_notRendered = screen.queryByTestId("some-content");
    expect(content_notRendered).toBeNull();
    element?.click();
    const content_nowRendered = screen.queryByTestId("some-content");
    expect(content_nowRendered).toBeDefined();
  });
});