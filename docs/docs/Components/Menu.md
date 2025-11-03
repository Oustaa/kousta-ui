---
sidebar_position: 2
---

import Badge from '@site/src/components/Badge';
import {
  QuickStartExample,
  ClickTriggerPreview,
  HoverTriggerPreview,
  CloseBehaviorPreview,
  PositionsPreview,
  IconsLabelsDividersPreview,
  DisabledItemsPreview,
  AccessibilityPreview,
} from '@site/src/components/@Components/Menu';

# Menu

The **Menu** component renders a lightweight, accessible dropdown that can be opened via **click** or **hover** and positioned relative to its trigger. It’s composed, headless-friendly, and easy to customize.

---

## Quick start

```tsx
import { Menu } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu>
      <Menu.Target>Open menu</Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Log out</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}
```

### Preview
<QuickStartExample />

---

## Anatomy

The Menu is a composition of small primitives:

- **`Menu.Menu`** – the container and state provider
- **`Menu.Target`** – the trigger button
- **`Menu.DropDown`** – the positioned panel
- **`Menu.Item`** – a clickable action row
- **`Menu.Label`** – a non-interactive label row
- **`Menu.Divider`** – a horizontal separator

```tsx
import { Menu } from "@kousta-ui/components";

<Menu.Menu>
  <Menu.Target>Actions</Menu.Target>
  <Menu.DropDown>
    <Menu.Label>General</Menu.Label>
    <Menu.Item>New</Menu.Item>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Divider />
    <Menu.Label>Danger</Menu.Label>
    <Menu.Item>Delete</Menu.Item>
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<IconsLabelsDividersPreview />

---

## Props

### `Menu.Menu` (container)

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"hover"` \| `"click"` | `"click"` | How the menu opens: on mouse **hover** or on **click**. |
| `closeOnClick` | `boolean` | `true` | If `true`, clicking any `Menu.Item` closes the menu by default. |
| `position` | [`MenuPosition`](#positions) | `"Bottom-Start"` | Where the dropdown appears relative to the trigger. |
| `offset` | `number` | `4` | Gap (in px) between trigger and dropdown. |

#### Type definitions

```ts
export type MenuOpenPosition = "Top" | "Bottom" | "Left" | "Right";
export type MenuOpenLocation = "Start" | "End" | "Center";
export type MenuPosition = \`\${MenuOpenPosition}-\${MenuOpenLocation}\`;

export type MenuProps = {
  type?: "hover" | "click";
  closeOnClick?: boolean;
  position?: MenuPosition;
  offset?: number;
};
```

---

### `Menu.Item`

| Prop | Type | Default | Description |
|---|---|---|---|
| `closeMenuOnClick` | `boolean` | inherits `closeOnClick` | Per-item override to close the menu when clicked. |
| `disabled` | `boolean` | `false` | Disables the item and prevents interaction. |
| `leftSection` | `ReactNode` | — | Optional element/icon rendered on the **left**. |
| `rightSection` | `ReactNode` | — | Optional element/icon rendered on the **right**. |

```ts
export type MenuItemProps = {
  closeMenuOnClick?: boolean;
  disabled?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
};
```

### Preview
<DisabledItemsPreview />

---

## Trigger modes

### Click (default)
```tsx
import { Menu } from "@kousta-ui/components";

<Menu.Menu>
  <Menu.Target>Open</Menu.Target>
  <Menu.DropDown>...</Menu.DropDown>
</Menu.Menu>
```

### Preview
<ClickTriggerPreview />

### Hover
```tsx
import { Menu } from "@kousta-ui/components";

<Menu.Menu type="hover">
  <Menu.Target>Hover me</Menu.Target>
  <Menu.DropDown>...</Menu.DropDown>
</Menu.Menu>
```

> When `type="hover"`, the container opens on `mouseenter` and closes on `mouseleave`. Click on the target won’t toggle the menu in this mode.

### Preview
<HoverTriggerPreview />

---

## Close behavior

Global default via `closeOnClick` on the container, with per-item override using `closeMenuOnClick`:

```tsx
import { Menu } from "@kousta-ui/components";

// Global: do NOT close when any item is clicked
<Menu.Menu closeOnClick={false}>
  <Menu.Target>Bulk actions</Menu.Target>
  <Menu.DropDown>
    <Menu.Item>Pin</Menu.Item>         {/* won't close */}
    <Menu.Item closeMenuOnClick>Share</Menu.Item> {/* will close */}
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<CloseBehaviorPreview />

---

## Positions

The dropdown can be placed on any side and alignment relative to the trigger. Use the controls below to change **position** and **offset** on the fly.

### Preview (interactive)
<PositionsPreview />

| Position | Visual |
|---|---|
| `Bottom-Start` | Below, left-aligned |
| `Bottom-Center` | Below, centered |
| `Bottom-End` | Below, right-aligned |
| `Top-Start` | Above, left-aligned |
| `Top-Center` | Above, centered |
| `Top-End` | Above, right-aligned |
| `Left-Start` | Left side, top-aligned |
| `Left-Center` | Left side, centered vertically |
| `Left-End` | Left side, bottom-aligned |
| `Right-Start` | Right side, top-aligned |
| `Right-Center` | Right side, centered vertically |
| `Right-End` | Right side, bottom-aligned |

Change the spacing from the trigger with `offset`:

```tsx
import { Menu } from "@kousta-ui/components";

<Menu.Menu position="Right-Center" offset={12}>
  <Menu.Target>More</Menu.Target>
  <Menu.DropDown>...</Menu.DropDown>
</Menu.Menu>
```

---

## With icons, labels & dividers

```tsx
import { Menu } from "@kousta-ui/components";
import { LuUser, LuSettings, LuLogOut } from "react-icons/lu";

<Menu.Menu>
  <Menu.Target>Account</Menu.Target>
  <Menu.DropDown>
    <Menu.Label>Profile</Menu.Label>
    <Menu.Item leftSection={<LuUser />}>View profile</Menu.Item>
    <Menu.Item leftSection={<LuSettings />}>Preferences</Menu.Item>
    <Menu.Divider />
    <Menu.Label>Session</Menu.Label>
    <Menu.Item leftSection={<LuLogOut />} closeMenuOnClick>
      Log out
    </Menu.Item>
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<IconsLabelsDividersPreview />

---

## Disabled items

```tsx
import { Menu } from "@kousta-ui/components";

<Menu.Menu>
  <Menu.Target>Move</Menu.Target>
  <Menu.DropDown>
    <Menu.Item>Project A</Menu.Item>
    <Menu.Item disabled>Project B (locked)</Menu.Item>
    <Menu.Item>Project C</Menu.Item>
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<DisabledItemsPreview />

---

## Accessibility

This component ships with basic ARIA roles already applied:

- `Menu.DropDown` renders with `role="menu"`
- `Menu.Item` renders with `role="menuitem"`

**Recommendations** (optional, but good practice):

- Add `aria-haspopup="menu"` and `aria-expanded` to `Menu.Target` if you need richer semantics (e.g., when used outside of the default button).
- Ensure keyboard focus management in your app shell (e.g., focus the first menu item on open, restore focus to the trigger on close) if you customize behavior.
- Provide visible focus rings via CSS for keyboard users.
- Use descriptive labels for icons-only items.

```tsx
import React, { useState } from "react";
import { Menu } from "@kousta-ui/components";

// Example: extra ARIA on the trigger
export default function A11yMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Menu.Menu>
      <Menu.Target aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        Options
      </Menu.Target>
      <Menu.DropDown>{/* items */}</Menu.DropDown>
    </Menu.Menu>
  );
}
```

<Badge color="green">Note</Badge> The component also closes when clicking outside the menu.

### Preview
<AccessibilityPreview />

---

## Styling

The default styles are provided via `Menu.module.css` with the following class hooks:

- `.kui-menu` – container (positioning context)
- `.kui-menu_target` – trigger button
- `.kui-menu_dropdown` – dropdown panel
- `.kui-menu_item` – item row
- `.kui-menu_label` – label text
- `.kui-menu_divider` – `<hr />` separator

You can override these classes or wrap the primitives to attach your design system tokens.

---

## Testing recipes

The library already uses semantic roles, which makes testing straightforward:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "@kousta-ui/components";

test("opens on click and applies correct position", async () => {
  render(
    <Menu.Menu position="Bottom-Center">
      <Menu.Target>Menu</Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Item 1</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );

  await userEvent.click(screen.getByText("Menu"));
  const dropdown = screen.getByRole("menu");
  expect(dropdown).toBeInTheDocument();
});
```

For hover mode:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "@kousta-ui/components";

render(
  <Menu.Menu type="hover" position="Left-End">
    <Menu.Target>Menu</Menu.Target>
    <Menu.DropDown>
      <Menu.Item>Item</Menu.Item>
    </Menu.DropDown>
  </Menu.Menu>
);

await userEvent.hover(screen.getByText("Menu"));
expect(screen.getByRole("menu")).toBeVisible();
```

---

## Tips & gotchas

- Use `closeOnClick={false}` for batch actions; override with `closeMenuOnClick` on the specific item that should close.
- Combine `Right-Start` / `Left-Start` for toolbar menus, and `Bottom-Start` for action menus attached to list rows.
- The menu uses the **nearest positioned ancestor** (`.kui-menu`) for absolute positioning—don’t remove `position: relative` there.
- Prefer concise labels; multi-line content is supported but consider `leftSection`/`rightSection` for icons/shortcuts instead.

---

## Types (reference)

```ts
export type MenuOpenPosition = "Top" | "Bottom" | "Left" | "Right";
export type MenuOpenLocation = "Start" | "End" | "Center";
export type MenuPosition = \`\${MenuOpenPosition}-${MenuOpenLocation}\`;

export type MenuProps = {
  type?: "hover" | "click";
  closeOnClick?: boolean;
  position?: MenuPosition;
  offset?: number;
};

export type MenuItemProps = {
  closeMenuOnClick?: boolean;
  disabled?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
};
```
