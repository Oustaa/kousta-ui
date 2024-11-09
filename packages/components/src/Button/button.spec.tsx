import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe("Button test", () => {
  it("should render props", () => {
    const content = "Kousta ui";
    render(<Button content={content} />);
    const buttonElement = screen.getByRole("button", { name: content });

    expect(buttonElement).toBeTruthy();
  });

  it("should invoke the onClick function", () => {
    const onClickCallBack = jest.fn();

    render(<Button content={"Kousta ui"} onClick={onClickCallBack} />);
    const buttonElement = screen.getByRole("button", { name: /Kousta ui/i });

    fireEvent.click(buttonElement);

    expect(onClickCallBack).toHaveBeenCalledTimes(1);
  });

  it("should not invoke the onClick function if the button was desibled", () => {
    const onClickCallBack = jest.fn();

    render(<Button content={"Kousta ui"} onClick={onClickCallBack} disabled />);
    const buttonElement = screen.getByRole("button", { name: /Kousta ui/i });

    fireEvent.click(buttonElement);

    expect(onClickCallBack).not.toHaveBeenCalled();
  });
});
