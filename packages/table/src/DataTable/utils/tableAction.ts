import { CanPerformAction, TOptions } from "../@types/props";

export function hasActions(options?: TOptions<unknown>): boolean {
  if (
    options &&
    (((options.actions || options?.extraActions) &&
      // has delete action
      ((options.actions?.delete &&
        options.actions.delete.canDelete &&
        typeof options.actions.delete.onDelete === "function") ||
        // has edit action
        (options.actions?.edit &&
          options.actions.edit.canEdit &&
          typeof options.actions.edit.onEdit === "function") ||
        // has extra actions
        (options.extraActions && options.extraActions?.length > 0))) ||
      options?.viewComp)
  )
    return true;

  return false;
}

export function hasDeleteAction(
  options: TOptions<unknown> | undefined,
  row?: unknown,
): boolean {
  if (
    options &&
    options.actions &&
    options.actions.delete &&
    options.actions.delete.onDelete &&
    typeof options.actions.delete.onDelete === "function" &&
    ((typeof options.actions.delete.canDelete === "function" &&
      options.actions.delete.canDelete?.(row)) ||
      (typeof options.actions.delete.canDelete !== "function" &&
        options.actions.delete.canDelete))
  )
    return true;
  return false;
}

export function hasEditAction(options: TOptions<unknown> | undefined): boolean {
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

export function canPerformActionResolver<T>(
  row: T,
  actionPerms?: CanPerformAction<T>,
) {
  return (
    actionPerms === undefined ||
    (typeof actionPerms === "boolean" && actionPerms === true) ||
    (typeof actionPerms === "function" && actionPerms(row))
  );
}
