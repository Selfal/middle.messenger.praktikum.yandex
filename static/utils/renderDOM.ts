export function render(query: string, block): Element | null {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}
