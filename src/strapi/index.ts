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
      output[key] = value;
    }
  }

  return output;
}

export const normalize = (input) => {
  if (input === null || input === undefined) {
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