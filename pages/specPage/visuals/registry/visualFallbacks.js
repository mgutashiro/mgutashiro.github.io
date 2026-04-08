/**
 * Resolves visual component from registry.
 * Matches by section + panel + mode.
 *
 * Includes fallback logic between modes if exact match is missing.
 */

export function resolveVisualComponent({
  registry,
  sectionId,
  panelId,
  mode,
}) {
  const entry = registry?.[sectionId]?.[panelId];

  if (!entry) return null;

  // 1. exact match
  if (entry[mode]) return entry[mode];

  // 2. fallback: colleague → friends
  if (mode === 'colleague' && entry.friends) {
    return entry.friends;
  }

  // 3. fallback: friends → colleague (optional)
  if (mode === 'friends' && entry.colleague) {
    return entry.colleague;
  }

  // 4. nothing found
  return null;
}