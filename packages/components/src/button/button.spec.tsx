import { render, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Add this import
import Button from "./index";

describe("Button test", () => {
  it("should render props", () => {
    const label = "Kousta ui";
    const { getByText } = render(<Button label={label} />);
    const labelElement = getByText(label);

    expect(labelElement).toBeInTheDocument(); // Correct `toBeInTheDocument`
  });
});
