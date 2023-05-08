interface StrapiObject {
  [key: string]: any;
}

function normalizeData(input: StrapiObject | null | undefined): StrapiObject | null {
  if (input === null || input === undefined) {
    return null;
  }

  if (Array.isArray(input)) {
    return {
      data: input.map(normalizeData),
    };
  }

  let output: StrapiObject = { ...input };

  if ('attributes' in input) {
    output = {
      ...output,
      ...normalizeData(input.attributes),
    };
    delete output.attributes;
  }

  if ('data' in input) {
    output = normalizeData(input.data);
  }

  return output;
}