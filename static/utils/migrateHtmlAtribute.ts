export function migrateHtmlAtribute(
  html: string | null,
): HTMLElement {
  const wrapper = document.createElement('div') as HTMLDivElement;

  wrapper.innerHTML = html || '';
  const result = wrapper.firstChild as HTMLElement;
  return result;
}
