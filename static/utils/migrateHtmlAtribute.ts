export function migrateHtmlAtribute(html) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  const result = wrapper.firstChild;
  return result;
}
