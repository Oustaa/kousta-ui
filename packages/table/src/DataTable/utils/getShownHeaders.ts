import { THeader } from "../_props";

export function getShownHeders(headers: THeader<unknown>): string[] {
  return Object.keys(headers).filter(
    (header) =>
      headers[header].visible !== false && headers[header].canSee !== false,
  );
}
