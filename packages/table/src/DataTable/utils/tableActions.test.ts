import {
  canPerformActionResolver,
  hasActions,
  hasDeleteAction,
  hasEditAction,
} from "./tableAction";

describe("table actions presence helpers", () => {
  describe("table actions helper", () => {
    it("canPerformActionResolver should return true in case of undefined bassed", () => {
      const result = canPerformActionResolver({}, undefined);
      expect(result).toBe(true);
    });

    it("canPerformActionResolver should return true in case true passed", () => {
      const result = canPerformActionResolver({}, true);
      expect(result).toBe(true);
    });

    it("canPerformActionResolver should return false in case false passed", () => {
      const result = canPerformActionResolver({}, false);
      expect(result).toBe(false);
    });

    it("canPerformActionResolver should call function in case function passed", () => {
      const func = jest.fn();
      canPerformActionResolver({}, func);
      expect(func).toHaveBeenCalled();
    });

    it("canPerformActionResolver should return function result in case function passed", () => {
      const result = canPerformActionResolver(
        { age: 12 },
        (row) => row.age >= 12,
      );
      expect(result).toBe(true);
    });
  });

  describe("hasActions", () => {
    it("returns false when options is undefined", () => {
      expect(hasActions(undefined)).toBe(false);
    });

    it("returns false when actions missing and no extraActions", () => {
      expect(hasActions({} as any)).toBe(false);
    });

    it("returns true when valid delete action exists (boolean canDelete = true)", () => {
      const options = {
        actions: {
          delete: { canDelete: true, onDelete: jest.fn() },
        },
      } as any;
      expect(hasActions(options)).toBe(true);
    });

    it("returns true when valid delete action exists (function canDelete)", () => {
      const options = {
        actions: {
          delete: { canDelete: () => true, onDelete: jest.fn() },
        },
      } as any;
      expect(hasActions(options)).toBe(true);
    });

    it("returns true when valid edit action exists", () => {
      const options = {
        actions: {
          edit: { canEdit: true, onEdit: jest.fn() },
        },
      } as any;
      expect(hasActions(options)).toBe(true);
    });

    it("returns true when extraActions is non-empty", () => {
      const options = {
        extraActions: [{ key: "x", title: "Do X", onClick: jest.fn() }],
      };
      expect(hasActions(options)).toBe(true);
    });

    it("returns false when delete is invalid (missing onDelete)", () => {
      const options = {
        actions: {
          delete: { canDelete: true },
        },
      } as any;
      expect(hasActions(options)).toBe(false);
    });

    it("returns false when edit is invalid (missing onEdit)", () => {
      const options = {
        actions: {
          edit: { canEdit: true },
        },
      } as any;
      expect(hasActions(options)).toBe(false);
    });

    it("returns false when extraActions is empty array", () => {
      const options = { extraActions: [] } as any;
      expect(hasActions(options)).toBe(false);
    });
  });

  describe("hasDeleteAction", () => {
    const row = { id: 1, age: 12 };

    it("returns false when options is undefined", () => {
      expect(hasDeleteAction(undefined, row)).toBe(false);
    });

    it("returns false when delete action missing", () => {
      const options = { actions: {} } as any;
      expect(hasDeleteAction(options, row)).toBe(false);
    });

    it("returns false when onDelete is not a function", () => {
      const options = {
        actions: {
          delete: { canDelete: true, onDelete: null },
        },
      } as any;
      expect(hasDeleteAction(options, row)).toBe(false);
    });

    it("returns true when canDelete = true and onDelete is function", () => {
      const options = {
        actions: {
          delete: { canDelete: true, onDelete: jest.fn() },
        },
      } as any;
      expect(hasDeleteAction(options, row)).toBe(true);
    });

    it("returns false when canDelete = false", () => {
      const options = {
        actions: {
          delete: { canDelete: false, onDelete: jest.fn() },
        },
      } as any;
      expect(hasDeleteAction(options, row)).toBe(false);
    });

    it("returns true when canDelete(row) returns true and calls predicate with row", () => {
      const canDelete = jest.fn((r) => r.age >= 10);
      const options = {
        actions: {
          delete: { canDelete, onDelete: jest.fn() },
        },
      } as any;
      expect(hasDeleteAction(options, row)).toBe(true);
      expect(canDelete).toHaveBeenCalledWith(row);
    });

    it("returns false when canDelete(row) returns false", () => {
      const options = {
        actions: {
          delete: { canDelete: () => false, onDelete: jest.fn() },
        },
      } as any;
      expect(hasDeleteAction(options, row)).toBe(false);
    });
  });

  describe("hasEditAction", () => {
    it("returns false when options is undefined", () => {
      expect(hasEditAction(undefined)).toBe(false);
    });

    it("returns false when edit action missing", () => {
      const options = { actions: {} } as any;
      expect(hasEditAction(options)).toBe(false);
    });

    it("returns false when onEdit is not a function", () => {
      const options = {
        actions: {
          edit: { canEdit: true, onEdit: null },
        },
      } as any;
      expect(hasEditAction(options)).toBe(false);
    });

    it("returns false when canEdit = false", () => {
      const options = {
        actions: {
          edit: { canEdit: false, onEdit: jest.fn() },
        },
      } as any;
      expect(hasEditAction(options)).toBe(false);
    });

    it("returns true when canEdit = true and onEdit is function", () => {
      const options = {
        actions: {
          edit: { canEdit: true, onEdit: jest.fn() },
        },
      } as any;
      expect(hasEditAction(options)).toBe(true);
    });
  });
});
