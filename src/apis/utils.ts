export function omitUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

export function parseDecimal(value: string | null | undefined): number | null {
  if (value == null) return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

export function buildJsonFormData(
  json: Record<string, unknown>,
  file?: { key: string; value: Blob; filename?: string },
): FormData {
  const form = new FormData();
  form.append("data", JSON.stringify(json));
  if (file) {
    form.append(file.key, file.value, file.filename);
  }
  return form;
}
