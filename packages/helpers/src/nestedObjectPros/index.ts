function extractSkipKeys(
  key: string,
): [string, (label: string) => string | unknown] {
  let [prefix, suffix] = ["", ""];

  if (key.startsWith("\\")) {
    prefix = key.substring(1, 2);
    key = key.replace(`\\${prefix}`, "");
  }

  if (/\\.$/.test(key)) {
    suffix = key.substring(key.length - 1);
    key = key.replace(`\\${suffix}`, "");
  }

  if (!prefix && !suffix) {
    return [key, (value) => value];
  }

  return [key, (value) => `${prefix}${value}${suffix}`];
}

export function getNestedProperty<T>(
  obj: Record<string, unknown>,
  key: string,
): T | undefined {
  const splitKey = key.split(" ");

  const initialValue = splitKey.map((k) => {
    const [processedKey, cb] = extractSkipKeys(k);

    const keys = processedKey.split(/\[|\]|\./).filter(Boolean);

    return keys.reduce<Record<string, unknown> | unknown>(
      (acc: unknown, currentKey: string) => {
        if (typeof acc === "object" && acc !== null) {
          const formattedCurrentKey = currentKey.replaceAll("|_|", " ");

          if (Object.prototype.hasOwnProperty.call(acc, formattedCurrentKey)) {
            // @ts-expect-error this is not an error
            return cb((acc as Record<string, unknown>)[formattedCurrentKey]);
          }
        }
        return undefined;
      },
      obj,
    );
  });

  const value =
    initialValue.length > 1 ? initialValue.join(" ") : initialValue[0];

  if (typeof value === "string" && !value.trim()) return undefined;

  return value as T;
}

export const updateNestedProperties = <T extends Record<string, unknown>>(
  obj: T,
  key: string,
  newValue: unknown,
): T => {
  const newObj = { ...obj };

  const keys = key.split(".");
  let value: Record<string, unknown> | undefined = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (typeof value[keys[i]] !== "object" || value[keys[i]] === null) {
      value[keys[i]] = {};
    }
    value = value[keys[i]] as Record<string, unknown>;
  }

  value[keys[keys.length - 1]] = newValue;

  return newObj;
};
