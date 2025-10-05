import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./index";

// ---- HTMLDialogElement polyfill for JSDOM ----
beforeAll(() => {
  if (!HTMLDialogElement.prototype.show) {
    HTMLDialogElement.prototype.show = function () {
      this.open = true;
    };
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
    };
  }
});

jest.mock("../Button", () => {
  return {
    __esModule: true,
    default: ({
      children,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
  };
});

describe("Modal", () => {
  const user = userEvent.setup();

  describe("Uncontrolled Modal", () => {
    it("should render the dialog element by default (not open yet)", () => {
      render(<Modal modalTrigger="Open Modal" />);
      const dialog = screen.getByRole("dialog", { hidden: true });
      expect(dialog).toBeInTheDocument();
      // @ts-expect-error this is not an error
      expect(dialog.open).toBeFalsy();
    });

    it("opens when clicking the trigger and runs afterOpen; locks body scroll", async () => {
      const afterOpen = jest.fn();
      render(
        <Modal modalTrigger="Open Modal" title="Hello" afterOpen={afterOpen} />,
      );

      await user.click(screen.getByRole("button", { name: /open modal/i }));

      const dialog = screen.getByRole("dialog");

      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);
      expect(afterOpen).toHaveBeenCalledTimes(1);
      expect(document.body.style.overflow).toBe("hidden");

      expect(screen.getByText("Hello")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "X" })).toBeInTheDocument();
    });

    it("closes on close button click and runs afterClose; restores body scroll", async () => {
      const afterClose = jest.fn();
      render(<Modal modalTrigger="Open" title="T" afterClose={afterClose} />);

      await user.click(screen.getByRole("button", { name: /open/i }));
      const dialog = screen.getByRole("dialog");
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);

      await user.click(screen.getByRole("button", { name: "X" }));

      // In uncontrolled mode, the component calls dialog.close()
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(false);
      expect(afterClose).toHaveBeenCalledTimes(1);
      expect(document.body.style.overflow).toBe("auto");
    });

    it("closes on Escape key", async () => {
      render(<Modal modalTrigger="Open" />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      const dialog = screen.getByRole("dialog");
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);

      fireEvent.keyDown(document, { key: "Escape" });

      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(false);
      expect(document.body.style.overflow).toBe("auto");
    });

    it("closes when clicking outside (document listener)", async () => {
      render(<Modal modalTrigger="Open" />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      const dialog = screen.getByRole("dialog");
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);

      // Click outside the dialog (on the document)
      fireEvent.mouseDown(document.body);

      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(false);
    });

    it("does not open if beforeOpen returns false", async () => {
      const beforeOpen = jest.fn(() => false);
      render(<Modal modalTrigger="Open" beforeOpen={beforeOpen} />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      // const dialog = screen.getByTestId("dialog-menu");
      const dialog = screen.getByRole("dialog", { hidden: true });
      // @ts-expect-error this is not an error
      expect(dialog.open).toBeFalsy();
      expect(beforeOpen).toHaveBeenCalledTimes(1);
    });

    it("does not close if beforeClose returns false", async () => {
      const beforeClose = jest.fn(() => false);
      render(<Modal modalTrigger="Open" beforeClose={beforeClose} />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      const dialog = screen.getByRole("dialog");
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);

      await user.click(screen.getByRole("button", { name: "X" }));
      // Still open because beforeClose prevented it
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);
      expect(beforeClose).toHaveBeenCalledTimes(1);
    });

    it("applies position styles with offset (e.g., top: 24px)", async () => {
      render(<Modal modalTrigger="Open" position="top" offset={24} />);
      const dialog = screen.getByRole("dialog", { hidden: true });
      // We render the dialog always in uncontrolled, but not open yet
      expect(dialog).toBeInTheDocument();
      // style is applied inline via modalPositionStyle
      expect(dialog).toHaveStyle({ top: "24px" });
    });
  });

  describe("Controlled Modal", () => {
    it("renders as open when opened=true; does not render trigger; calls afterOpen", () => {
      const afterOpen = jest.fn();
      render(
        <Modal
          opened={true}
          onClose={() => {}}
          title="Controlled"
          afterOpen={afterOpen}
        />,
      );

      // No trigger button in controlled mode
      expect(
        screen.queryByRole("button", { name: /open/i }),
      ).not.toBeInTheDocument();

      const dialog = screen.getByRole("dialog");
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);
      expect(afterOpen).toHaveBeenCalledTimes(1);
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("calls onClose on close button (but stays open until parent changes prop)", async () => {
      const onClose = jest.fn();
      render(<Modal opened={true} onClose={onClose} title="C" />);

      const dialog = screen.getByRole("dialog");
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);

      await user.click(screen.getByRole("button", { name: "X" }));

      expect(onClose).toHaveBeenCalledTimes(1);
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);
    });

    it("calls onClose on Escape (still remains open until parent changes)", () => {
      const onClose = jest.fn();
      render(<Modal opened={true} onClose={onClose} />);

      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);

      const dialog = screen.getByRole("dialog");
      // @ts-expect-error this is not an error
      expect(dialog.open).toBe(true);
    });
  });
});
