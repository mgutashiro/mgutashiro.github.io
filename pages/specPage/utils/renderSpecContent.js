/**
 * Normalizes text and content blocks for rendering.
 * Trims strings and ensures consistent structure.
 *
 * Helps keep spec content clean and predictable.
 */

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