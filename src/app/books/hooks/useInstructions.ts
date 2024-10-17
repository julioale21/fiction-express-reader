import { useState } from "react";

export function useInstructions() {
  const [showInstructions, setShowInstructions] = useState(true);

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  return { showInstructions, toggleInstructions };
}
