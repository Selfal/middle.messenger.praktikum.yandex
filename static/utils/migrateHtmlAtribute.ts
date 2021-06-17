export function migrateHtmlAtribute(html: string): HTMLElement {
  const wrapper: HTMLElement = document.createElement('div');
  wrapper.innerHTML = html;
  const result = <HTMLElement>wrapper.firstChild;
  return result;
}
