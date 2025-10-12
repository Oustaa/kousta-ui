---
sidebar_position: 4
---

import Badge from '@site/src/components/Badge';
import { UncontrolledModal, ControlledModal, ModalAsDrawer } from '@site/src/components/@Components/Modal';


# Modal

The **Modal** component provides an accessible and flexible dialog interface for displaying content on top of the current page. It supports **controlled** and **uncontrolled** usage patterns, positioning, sizing, lifecycle callbacks, and backdrop configuration.

---

## Usage

```tsx
import { Modal } from "@kousta-ui/components";

<Modal modalTrigger="Open Modal">
  {/* Modal Content */}
</Modal>
```

The modal can be controlled **internally** (uncontrolled) or **externally** (controlled) via props.

---

## Props

| Name | Type | Description | Required | Default |
|------|------|-------------|-----------|----------|
| `modalTrigger` | `string \| ReactNode` | The element or string that triggers the modal (for uncontrolled modals). | No | - |
| `opened` | `boolean` | Controls whether the modal is open (for controlled modals). | No | - |
| `onClose` | `VoidFunction` | Called when modal is closed (required for controlled modals). | Yes (Controlled) | - |
| `title` | `string \| ReactNode` | The modal title. | No | - |
| `withCloseBtn` | `boolean` | Displays a close button in the header. | No | `true` |
| `size` | [`ModalSize`](#modal-sizes) \| `string` | Sets modal width. | No | `"md"` |
| `withBackdrop` | `boolean` | Displays a backdrop overlay behind the modal. | No | `true` |
| `position` | [`ModalPosition`](#modal-positions) | Controls modal position relative to the viewport. | No | `"center"` |
| `offset` | `number` | Distance in pixels from viewport edge (used with `top`, `bottom`, etc.). | No | `undefined` |
| `fullHeight` | `boolean` | Makes the modal occupy the full viewport height (`100vh`). | No | `false` |
| `fullWidth` | `boolean` | Makes the modal occupy the full viewport width (`100vw`). | No | `false` |
| `beforeOpen` | `() => void \| boolean` | Executes before opening. Returning `false` cancels opening. | No | - |
| `afterOpen` | `VoidFunction` | Executes right after modal opens. | No | - |
| `beforeClose` | `() => void \| boolean` | Executes before closing. Returning `false` cancels closing. | No | - |
| `afterClose` | `VoidFunction` | Executes right after modal closes. | No | - |

---

## Examples

### Uncontrolled Modal

An **uncontrolled modal** manages its open state internally. Use this when the modal is lightweight and doesn’t depend on heavy data or async requests.

:::info
Use **uncontrolled modals** for simple UI dialogs such as confirmations or local information.
:::

```tsx
<Modal modalTrigger="Open Modal">
  <p>This is a simple uncontrolled modal.</p>
</Modal>
```

#### Preview
<UncontrolledModal />
<br/><br/>

:::warning When not to use it
Avoid uncontrolled modals for complex or data-heavy components since they mount immediately when the page loads.
:::

---

### Controlled Modal

A **controlled modal** allows parent components to manage its open/close state manually. This is useful for modals that depend on asynchronous data or need to be programmatically opened/closed.

```tsx
import { useDisclosure } from "@kousta-ui/hooks";

const Example = () => {
  const { close, open, opened } = useDisclosure(false);

  return (
    <>
      <button onClick={() => setOpened(true)}>Open Modal</button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Controlled Modal">
        <p>This modal is controlled from outside.</p>
      </Modal>
    </>
  );
};
```
#### Preview
<ControlledModal />
<br/><br/>

---

### Drawer Example

By combining `position` and `fullHeight`, you can create **Drawer-like modals** anchored to screen edges.

```tsx
<Modal
  modalTrigger="Open Drawer"
  position="left-top"
  fullHeight
>
  <p>This modal behaves like a drawer.</p>
</Modal>
```
#### Preview
<ModalAsDrawer />
<br/><br/>


---

## Modal Sizes

| Size | Value | Description |
|------|--------|-------------|
| `xs` | `600px` | Extra small modal |
| `sm` | `850px` | Small modal |
| `md` | `1250px` | Medium (default) |
| `lg` | `1440px` | Large modal |
| `xl` | `1800px` | Extra large modal |

You can also provide a **custom pixel width** as a string, e.g. `"1000px"`.

---

## Modal Positions

| Position | Description |
|-----------|-------------|
| `center` | Center of the viewport |
| `top` | Anchored at the top |
| `bottom` | Anchored at the bottom |
| `left`, `right` | Vertically centered side panels |
| `left-top`, `left-bottom`, `right-top`, `right-bottom` | Corner positions |

---

## Lifecycle Callbacks

| Hook | Description | Usage |
|------|--------------|--------|
| `beforeOpen` | Runs before opening. Return `false` to prevent opening. | Validation or async checks |
| `afterOpen` | Runs immediately after modal opens. | Analytics or focus logic |
| `beforeClose` | Runs before closing. Return `false` to cancel close. | Confirm dialogs |
| `afterClose` | Runs immediately after modal closes. | Cleanup or notifications |

---

## Animations <Badge color="yellow">Upcoming</Badge>

Animation support (fade, slide, zoom, etc.) is currently **not implemented** but is **planned** for a future release.

---

## Type Definitions

```ts
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ModalPosition =
  | "top"
  | "bottom"
  | "right"
  | "right-top"
  | "right-bottom"
  | "left"
  | "left-top"
  | "left-bottom"
  | "center";

export type ModalProps = { /* see props table above */ }
```

---

## Tips

- The modal automatically handles body scroll locking.
- Use `withBackdrop={false}` for non-blocking overlays.
- Combine `fullWidth` and `position="bottom"` for a **mobile sheet** effect.
