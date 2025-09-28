import { THeader } from "../@types/props";

export function getShownHeders(headers: THeader<unknown>): string[] {
  return Object.keys(headers).filter(
    (header) =>
      headers[header].visible !== false && headers[header].canSee !== false,
  );
}
