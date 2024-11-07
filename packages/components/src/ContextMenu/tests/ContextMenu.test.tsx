import { render, screen, fireEvent } from "@testing-library/react";
import ContextMenu from "../index";
import { ContextMenuOptionType } from "../_props";

const mockOption1Click = jest.fn();
const mockOption1Sub1Click = jest.fn();

const options: ContextMenuOptionType[] = [
  {
    title: "Option one",
    onClick: mockOption1Click,
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
];

beforeEach(() => {
  render(<ContextMenu options={options}>Context Menu</ContextMenu>);
});

describe("ContextMenu test", () => {
  it("should render menu content correctly", () => {
    screen.logTestingPlaygroundURL(); // Optional: Useful for debugging

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
  });
});
