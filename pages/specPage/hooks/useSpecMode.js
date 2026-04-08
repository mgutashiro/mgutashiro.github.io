/**
 * Manages current explanation mode (friends / colleague).
 * Provides mode state and setter for toggling.
 */

import { useState } from 'react';
import { defaultMode } from '../data/specModes';

export function useSpecMode(initialMode = defaultMode) {
  const [mode, setMode] = useState(initialMode);

  function toggleMode(nextMode) {
    setMode(nextMode);
  }

  return {
    mode,
    setMode: toggleMode
  };
}