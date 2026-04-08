export function normalizeTextBlock(text = '') {
  return text.trim();
}

export function normalizeContentBlocks(blocks = []) {
  if (!Array.isArray(blocks)) return [];
  return blocks.map((block) => ({
    ...block,
    value: typeof block.value === 'string' ? block.value.trim() : block.value
  }));
}