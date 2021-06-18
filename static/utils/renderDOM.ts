export function render(query: string, block): Element {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}
