import { getNestedProperty, updateNestedProperties } from "./index";

const obj = {
  name: "Kousta ui",
  versions: {
    number: 123,
    name: "@latest",
    date: {
      year: 2024,
      month: 11,
      days: [1, 2, 3, 4, 5],
    },
  },
};

describe("nestedObjectPros tests", () => {
  describe("getNestedProperty tests", () => {
    it("should return the correct value (Level 1)", () => {
      const value = getNestedProperty(obj, "name");

      expect(value).toBe("Kousta ui");
    });

    it("should return the correct value (Level 2)", () => {
      const versionNumber = getNestedProperty(obj, "versions.number");
      expect(versionNumber).toBe(123);

      const versionName = getNestedProperty(obj, "versions.name");
      expect(versionName).toBe("@latest");
    });

    it("should return the correct value (Level 3)", () => {
      const level3year = getNestedProperty(obj, "versions.date.year");
      expect(level3year).toBe(2024);

      const level3Days = getNestedProperty(obj, "versions.date.days");
      expect(level3Days).toHaveLength(5);
    });
  });

  describe("updateNestedProperties tests", () => {
    it("should update a props (Level 1)", () => {
      updateNestedProperties(obj, "name", "@kousta-ui");

      const objName = getNestedProperty(obj, "name");

      expect(objName).toBe("@kousta-ui");
    });
  });
});
