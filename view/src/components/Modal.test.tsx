
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("<Modal />", () => {
  const callback = vi.fn();
  test("renders and closes", async () => {
    render(
      <Modal
        isVisible={true}
        visibilitySetter={callback}
      >
        <p data-testid="just-an-itm">Just something to render inside...</p>
      </Modal>
    );
    const content = screen.queryByTestId("just-an-itm");
    expect(content).toBeDefined();
    const close = screen.queryByText("Close");
    close?.click();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});