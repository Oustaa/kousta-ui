export type MenuOpenPosition = "Top" | "Bottom" | "Left" | "Right";
export type MenuOpenLocation = "Start" | "End" | "Center";

export type MenuPosition = `${MenuOpenPosition}-${MenuOpenLocation}`;

export type MenuProps = {
  type?: "hover" | "click";
  closeItemOnClick?: boolean;
  position?: MenuPosition;
  offset?: number;
};
