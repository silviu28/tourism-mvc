import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DynamicTable from "./DynamicTable";

describe("<DynamicTable />", () => {
  const items = [{
    fieldA: "My field",
    fieldB: {
      fieldC: {},
      fieldD: []
    },
    fieldE: [],
    fieldG: null,
    fieldH: 12
  }];

  const callback = vi.fn();

  test("renders", () => {
    render(
      <DynamicTable items={items} onRowSelect={callback} />
    );
    const element = screen.getByText("My field");
    expect(element).toBeDefined();
  });
});