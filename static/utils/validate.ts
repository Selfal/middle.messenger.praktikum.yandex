export default function validate(value: string, re: RegExp): boolean {
  const result = Boolean(
    re ? re.test(String(value).toLowerCase()) : value,
  );
  return result;
}
