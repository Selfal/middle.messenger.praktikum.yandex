export function render(query: string, block): Element | null {
  const root = document.querySelector(query);
  console.log('root: ', root);

  console.log('block: ', block);
  console.log('.getContent(): ', block.getContent());
  root?.appendChild(block.getContent());
  return root;
}
