import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./index";

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
    it("should render the target button text", () => {
      render(<Modal modalTrigger="Open Modal">Modal Content</Modal>);
      const buttonElem = screen.getByRole("button", { name: /open modal/i });
      expect(buttonElem).toBeInTheDocument();
    });

    it("should render the dialog element by default (not open yet)", () => {
      render(<Modal modalTrigger="Open Modal">Modal Content</Modal>);

      const modal = screen.queryByRole("modal");

      expect(modal).not.toBeInTheDocument();
    });

    it("opens when clicking the trigger and runs afterOpen; locks body scroll", async () => {
      const afterOpen = jest.fn();
      render(
        <Modal modalTrigger="Open Modal" title="Hello" afterOpen={afterOpen} />,
      );

      await user.click(screen.getByRole("button", { name: /open modal/i }));

      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();
      expect(afterOpen).toHaveBeenCalledTimes(1);
      expect(document.body.style.overflow).toBe("hidden");

      // modal title
      expect(screen.getByText("Hello")).toBeInTheDocument();
      // modal close button
      expect(screen.getByRole("modal-close")).toBeInTheDocument();
    });

    it("closes on close button click and runs afterClose; restores body scroll", async () => {
      const afterClose = jest.fn();
      render(<Modal modalTrigger="Open" title="T" afterClose={afterClose} />);

      await user.click(screen.getByRole("button", { name: /open/i }));
      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();

      await user.click(screen.getByRole("modal-close"));

      expect(modal).not.toBeInTheDocument();
      expect(afterClose).toHaveBeenCalledTimes(1);
      expect(document.body.style.overflow).toBe("");
    });

    it("closes on Escape key", async () => {
      render(<Modal modalTrigger="Open" />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });

      expect(modal).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe("");
    });

    it("closes when clicking outside (document listener)", async () => {
      render(<Modal modalTrigger="Open" />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();

      fireEvent.mouseDown(document.body);

      expect(modal).not.toBeInTheDocument();
    });

    it("does not open if beforeOpen returns false", async () => {
      const beforeOpen = jest.fn(() => false);
      render(<Modal modalTrigger="Open" beforeOpen={beforeOpen} />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      const modal = screen.queryByRole("modal");

      expect(modal).not.toBeInTheDocument();
      expect(beforeOpen).toHaveBeenCalledTimes(1);
    });

    it("does not close if beforeClose returns false", async () => {
      const beforeClose = jest.fn(() => false);
      render(<Modal modalTrigger="Open" beforeClose={beforeClose} />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();

      await user.click(screen.getByRole("modal-close"));

      expect(modal).toBeInTheDocument();
      expect(beforeClose).toHaveBeenCalledTimes(1);
    });

    it("applies position styles with offset (e.g., top: 24px)", async () => {
      render(<Modal modalTrigger="Open" position="top" offset={24} />);
      await user.click(screen.getByRole("button", { name: /open/i }));

      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();
      expect(modal).toHaveStyle({ top: "24px" });
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

      expect(
        screen.queryByRole("button", { name: /open/i }),
      ).not.toBeInTheDocument();

      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();
      expect(afterOpen).toHaveBeenCalledTimes(1);
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("calls onClose on close button (but stays open until parent changes prop)", async () => {
      const onClose = jest.fn();
      render(<Modal opened={true} onClose={onClose} title="C" />);

      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();

      await user.click(screen.getByRole("modal-close"));

      expect(onClose).toHaveBeenCalledTimes(1);

      expect(modal).toBeInTheDocument();
    });

    it("calls onClose on Escape (still remains open until parent changes)", () => {
      const onClose = jest.fn();
      render(<Modal opened={true} onClose={onClose} />);
      const modal = screen.queryByRole("modal");

      expect(modal).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
