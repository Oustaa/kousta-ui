import { TOptions } from "../@types/props";

export function hasActions(options?: TOptions): boolean {
  if (
    options &&
    options.actions && // has delete action
    ((options.actions?.delete &&
      options.actions.delete.canDelete &&
      typeof options.actions.delete.onDelete === "function") ||
      // has edit action
      (options.actions?.edit &&
        options.actions.edit.canEdit &&
        typeof options.actions.edit.onEdit === "function") ||
      // has extra actions
      (options.extraActions && options.extraActions?.length > 0))
  )
    return true;

  return false;
}

export function hasDeleteAction(options?: TOptions): boolean {
  if (
    options &&
    options.actions &&
    options.actions.delete &&
    options.actions.delete.onDelete &&
    typeof options.actions.delete.onDelete === "function" &&
    options.actions.delete.canDelete
  )
    return true;
  return false;
}

export function hasEditAction(options?: TOptions): boolean {
  if (
    options &&
    options.actions &&
    options.actions.edit &&
    options.actions.edit.onEdit &&
    typeof options.actions.edit.onEdit === "function" &&
    options.actions.edit.canEdit
  )
    return true;
  return false;
}
