import {
  CSSProperties,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ModalPosition, ModalProps, ModalSize } from "./_props";
import classes from "./Modal.module.css";
import Button from "../Button";

const modalSizeValue: Record<ModalSize, string> = {
  xs: "600px",
  sm: "850px",
  md: "1250px",
  lg: "1440px",
  xl: "1800px",
};

const modalPositionStyle = (
  offset?: number,
): Record<ModalPosition, CSSProperties> => ({
  center: {
    marginInline: "auto",
    top: "50%",
    transform: "translateY(-50%)",
  },
  bottom: {
    bottom: `${offset}px`,
    top: "unset",
  },
  top: {
    bottom: "unset",
    top: `${offset}px`,
  },
  right: {
    marginInline: "unset",
    marginInlineStart: "auto",
    top: "50%",
    transform: "translateY(-50%)",
    left: "unset",
  },
  "right-top": {
    marginInlineStart: "auto",
    top: `${offset}px`,
    left: "unset",
  },
  "right-bottom": {
    marginInlineStart: "auto",
    bottom: `${offset}px`,
    top: "unset",
    left: "unset",
  },
  left: {
    marginInline: "unset",
    top: "50%",
    transform: "translateY(-50%)",
    right: "unset",
  },
  "left-bottom": {
    marginInline: "unset",
    bottom: `${offset}px`,
    top: "unset",
    right: "unset",
  },
  "left-top": {
    marginInline: "unset",
    top: `${offset}px`,
    right: "unset",
  },
});

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  opened,
  onClose,
  size = "md",
  withCloseBtn = true,
  withBackdrop = true,
  modalTrigger,
  afterClose,
  beforeClose,
  afterOpen,
  beforeOpen,
  position = "center",
  offset,
  fullHeight,
  fullWidth,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const isControlled = typeof opened === "boolean";
  const [modalOpened, setModalOpened] = useState<boolean>(!!opened);
  const isOpen = isControlled ? !!opened : modalOpened;

  const modalSize =
    size && size in modalSizeValue
      ? modalSizeValue[size as ModalSize]
      : `${size}px`;

  const lockBody = (lock: boolean) => {
    const body = document.querySelector("body");
    if (body) body.style.overflow = lock ? "hidden" : "auto";
  };

  const handleOpenModal = useCallback(() => {
    if (!modalRef.current) return;
    if (beforeOpen && beforeOpen() === false) return;

    if (!isControlled) {
      modalRef.current.show();
      lockBody(true);
      setModalOpened(true);
      afterOpen?.();
    }

    modalRef.current.classList.add("toLeft");
  }, [beforeOpen, afterOpen, isControlled]);

  const handleCloseModal = useCallback(() => {
    if (beforeClose && beforeClose() === false) return;

    if (isControlled) {
      onClose?.();
      return;
    }

    if (!modalRef.current) return;
    modalRef.current.close();
    lockBody(false);
    setModalOpened(false);
    afterClose?.();
  }, [beforeClose, afterClose, isControlled, onClose]);

  useEffect(() => {
    const dlg = modalRef.current;
    if (!dlg) return;

    if (isOpen) {
      if (!dlg.open) {
        dlg.show();
        lockBody(true);
        afterOpen?.();
      }
    } else {
      if (dlg.open) {
        dlg.close();
        lockBody(false);
        afterClose?.();
      }
    }
  }, [isOpen, afterOpen, afterClose]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const modalEl = modalRef.current;
      if (!modalEl) return;

      const target = e.target as Node | null;
      if (target && modalEl.contains(target)) return;

      const path = (e as MouseEvent | TouchEvent).composedPath?.() as
        | Node[]
        | undefined;
      if (path && path.some((n) => n instanceof Node && modalEl.contains(n)))
        return;

      handleCloseModal();
    };

    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("touchstart", onPointerDown, true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown, true);
      document.removeEventListener("touchstart", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, handleCloseModal]);

  return (
    <>
      {!isControlled && modalTrigger && (
        <Button onClick={handleOpenModal}>{modalTrigger}</Button>
      )}

      {withBackdrop && isOpen && <div className={classes["backdrop"]} />}
      {(!isControlled || (isControlled && isOpen)) && (
        <dialog
          data-testId={"dialog-menu"}
          role="dialog"
          ref={modalRef}
          style={{
            animation: `toLeft 5s toLeft`,
            width: fullWidth ? "100vw" : `clamp(200px, ${modalSize}, 100%)`,
            height: fullHeight ? "100vh" : "max-content",
            ...modalPositionStyle(offset)[position],
          }}
          className={classes["modal-container"]}
        >
          {(title || withCloseBtn) && (
            <header className={classes["menu-header"]}>
              {title ? (
                <h3 className={classes["menu-title"]}>{title}</h3>
              ) : (
                <h3 />
              )}
              {withCloseBtn ? (
                <button onClick={handleCloseModal}>X</button>
              ) : (
                <div />
              )}
            </header>
          )}
          <div className={classes["menu-body"]}>{children}</div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
