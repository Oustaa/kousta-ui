import { fireEvent, render, screen } from "@testing-library/react";
import { ContextMenuItem } from "../components/ContextMenuItem";

const optionfunction = jest.fn();
const setMenuVisible = jest.fn();

describe("Context menu item tests", () => {
  it("should render menu item", () => {
    render(
      <ContextMenuItem
        {...{
          title: "Hello option",
          onClick: optionfunction,
        }}
        setMenuVisible={setMenuVisible}
      />,
    );

    const menuItem = screen.getByText(/hello option/i);

    // .toBeInTheDocument() says is not a funciton, why dont know why.
    expect(menuItem).toBeTruthy();
  });

  it("should not render menu item with hidden attribute", () => {
    render(
      <ContextMenuItem
        {...{
          title: "Hello option",
          onClick: optionfunction,
          hidden: true,
        }}
        setMenuVisible={setMenuVisible}
      />,
    );
    const menuItem = screen.queryByText(/hello option/i);

    // .toBeInTheDocument() says is not a funciton, why dont know why.
    expect(menuItem).not.toBeTruthy();
  });

  it("should not allow click on inactive menu item", () => {
    render(
      <ContextMenuItem
        {...{
          title: "Hello option",
          onClick: optionfunction,
          active: false,
        }}
        setMenuVisible={setMenuVisible}
      />,
    );

    fireEvent.click(screen.getByText(/hello option/i));

    expect(optionfunction).toHaveBeenCalledTimes(0);
  });
});
