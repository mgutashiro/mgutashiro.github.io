import { useState } from 'react';

export function useActiveInstrumentPart(defaultPart = 'source') {
  const [activePart, setActivePart] = useState(defaultPart);

  return {
    activePart,
    setActivePart
  };
}