export const getOrThrow = (value: string) => {
  const resolved = process.env[value];
  if (!resolved) {
    throw new Error(`Missing environment variable: ${value}`);
  }
  return resolved;
};
