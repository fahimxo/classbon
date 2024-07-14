import { describe } from "node:test";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("button", () => {
  test("a default button", () => {
    const { getByText } = render(<Button>click me</Button>);
    expect(getByText("click me")).toBeInTheDocument();
  });

  test("disabled buttn when isDisabled props is true", () => {
    const { getByRole } = render(<Button isDisabled={true}>click me</Button>);
    expect(getByRole("button")).toBeDisabled();
  });

  test("applies the correct css class for different button variants", () => {
    const { rerender } = render(<Button variant="primary">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");
    rerender(<Button variant="info">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-info");
  });
});
