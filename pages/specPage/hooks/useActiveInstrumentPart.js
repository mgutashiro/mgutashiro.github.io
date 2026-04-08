/**
 * Tracks currently active instrument part (e.g. source, sample).
 * Provides state + setter for interactive visuals.
 */

import { useState } from 'react';

export function useActiveInstrumentPart(defaultPart = 'source') {
  const [activePart, setActivePart] = useState(defaultPart);

  return {
    activePart,
    setActivePart
  };
}