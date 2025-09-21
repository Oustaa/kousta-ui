import { TOptions } from "../@types/props";

export function hasActions(options?: TOptions): boolean {
  if (
    !options ||
    (!options.actions && !options.extraActions) ||
    // !TODO: this should be cheked also with permision (can delete, can edit once they are added)
    (!options.actions?.delete && !options.actions?.edit) ||
    options.extraActions?.length === 0
  )
    return false;

  return true;
}

export function hasDeleteAction(options?: TOptions): boolean {
  if (options && options.actions && options.actions.delete) return true;
  return false;
}

export function hasEditAction(options?: TOptions): boolean {
  if (options && options.actions && options.actions.edit) return true;
  return false;
}
