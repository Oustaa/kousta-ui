import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button test", () => {
  it("should render props", () => {
    const content = "Kousta ui";
    render(<Button>{content}</Button>);
    const buttonElement = screen.getByRole("button", { name: content });

    expect(buttonElement).toBeTruthy();
  });

  it("should invoke the onClick function", () => {
    const onClickCallBack = jest.fn();

    render(<Button onClick={onClickCallBack}>Kousta ui</Button>);
    const buttonElement = screen.getByRole("button", { name: /Kousta ui/i });

    fireEvent.click(buttonElement);

    expect(onClickCallBack).toHaveBeenCalledTimes(1);
  });

  it("should not invoke the onClick function if the button was desibled", () => {
    const onClickCallBack = jest.fn();

    render(
      <Button onClick={onClickCallBack} disabled>
        Kousta ui
      </Button>,
    );
    const buttonElement = screen.getByRole("button", { name: /Kousta ui/i });

    fireEvent.click(buttonElement);

    expect(onClickCallBack).not.toHaveBeenCalled();
  });

  // tests that i should implement
  // variants
  // loading state
  // disabled state
  // size
  // type
  // loadingIndicator
});
