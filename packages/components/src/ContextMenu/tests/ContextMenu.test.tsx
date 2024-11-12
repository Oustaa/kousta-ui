import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContextMenu from "../index";
import { ContextMenuOptionType } from "../_props";

const mockOption1Click = jest.fn();
const mockOption1Sub1Click = jest.fn();

const options: ContextMenuOptionType[] = [
  {
    title: "Option one",
    onClick: mockOption1Click,
    closeOnClick: false,
  },
  {
    title: "Option two",
    subOptions: [
      {
        title: "Option 2 sub 1",
        onClick: mockOption1Sub1Click,
      },
      {
        title: "Option 2 sub 2",
        onClick() {
          console.log("Option 2 sub 2");
        },
      },
    ],
  },
  {
    title: "Option three",
    subOptions: [
      {
        title: "Option 3 sub 1",
        onClick: mockOption1Sub1Click,
      },
      {
        title: "Option 3 sub 2",
        onClick() {
          console.log("Option 3 sub 2");
        },
      },
    ],
  },
];

beforeEach(() => {
  render(<ContextMenu options={options}>Context Menu</ContextMenu>);
});
describe("ContextMenu test", () => {
  it("should render menu content correctly", () => {
    const contentEl = screen.getByText(/context menu/i);
    expect(contentEl).toBeTruthy();
  });

  // before each test right click on the context to open the context menu
  beforeEach(() => {
    fireEvent.contextMenu(screen.getByText(/context menu/i));
  });
  describe("Context menu options", () => {
    it("should open context menu on right-click", () => {
      const optionEl = screen.getByText(/option one/i);
      expect(optionEl).toBeTruthy();
    });

    it("should invoke the option function", () => {
      fireEvent.click(screen.getByText(/option one/i));

      expect(mockOption1Click).toHaveBeenCalledTimes(1);
    });

    it("should not close the options after clicking on an option", () => {
      const optionOneElementBeforClick = screen.getByText(/Option one/i);
      fireEvent.click(optionOneElementBeforClick);

      expect(mockOption1Click).toHaveBeenCalledTimes(2);
      const optionOneElementAfterClick = screen.getByText(/Option one/i);
      expect(optionOneElementAfterClick).toBeTruthy();
    });
  });

  // before each test click on the option two to open the sub options menu
  beforeEach(() => {
    fireEvent.click(screen.getByText(/option two/i));
  });
  describe("Context menu sub options", () => {
    it("should open context menu on right-click", () => {
      // const subOptionOne = screen.getAllByText(/option 1 sub 1/i);
      const subOptions = screen.getAllByText(/option \d sub \d/i);

      expect(subOptions.length).toBe(2);
    });

    it("should invoke the option function", () => {
      const subOptionOne = screen.getByText(/option 2 sub 1/i);
      fireEvent.click(subOptionOne);

      expect(mockOption1Sub1Click).toHaveBeenCalledTimes(1);
    });

    // it("should close sub option if another one is clicked", () => {
    //   // find and click on the first options with subs
    //   const optionTwoElem = screen.getByText(/Option two/i);
    //   fireEvent.click(optionTwoElem);

    //   // check to validate that the sub oiptions for the option one is opened
    //   const optionTwoSub = screen.getByText(/Option 2 sub 1/i);
    //   expect(optionTwoSub).toBeTruthy();

    //   // find and click on the third option with subs
    //   const optionThreeElem = screen.getByText(/Option three/i);
    //   expect(optionThreeElem).toBeTruthy();
    //   fireEvent.click(optionThreeElem);

    //   // test that the third option subs are opened
    //   const optionThreeElemSubOption = screen.getByText(/Option 3 sub 1/i);
    //   expect(optionThreeElemSubOption).toBeTruthy();

    //   // test that the second option subs are closed
    //   const optionTwoElemSubOption = screen.queryByText(/Option 2 sub 1/i);
    //   expect(optionTwoElemSubOption).toBeTruthy();
    // });
  });
});
