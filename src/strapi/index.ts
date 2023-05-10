function toPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const plainObj = {};

  for (const key in obj) {
    plainObj[key] = toPlainObject(obj[key]);
  }

  return plainObj;
}

const normalizeNestedAttributes = (attributes) => {
  const output = {};

  for (const key in attributes) {
    const value = attributes[key];

    if (
      typeof value === "object" &&
      value !== null &&
      "data" in value &&
      value.data !== null &&
      "id" in value.data &&
      "attributes" in value.data
    ) {
      const normalizedValue = normalize(value);
      output[key] = { id: value.data.id, ...normalizedValue };
    } else {
      output[key] = toPlainObject(value);
    }
  }

  return output;
}

export const normalize = (input) => {
  if (input === null || input === undefined || (typeof input === 'object' && !Object.keys(input).length )) {
    return null;
  }

  if (Array.isArray(input)) {
    return {
      data: input.map(normalize),
    };
  }

  let output = { ...input };

  if (input.attributes) {
    output = {
      ...output,
      ...normalizeNestedAttributes(input.attributes),
    };
    delete output.attributes;
  }

  if (input.data) {
    output = normalize(input.data);
  }

  return output;
}