export default function validate(
  value: string | undefined,
  re: RegExp | undefined,
): boolean {
  if (!re || !value) {
    return false;
  }

  const result: boolean = Boolean(
    re ? re.test(String(value)) : value,
  );
  return result;
}
