import { describe, expect, test} from "vitest";
import { render, screen } from "@testing-library/react";
import PolaroidImage from "./PolaroidImage";

describe("<PolaroidImage />", () => {
  test("renders", () => {
    render(
      <PolaroidImage
        src=""
        alt="An image."
        subtext="This should be visible"
      />
    );
    const element = screen.getByText("This should be visible");
    expect(element).toBeDefined();
  });
});