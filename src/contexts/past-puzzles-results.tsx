import { useEffect, useState } from "react";
import { PastPuzzlesResultsContext, useGameContext } from "./utils";

export function PastPuzzlesResultsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSolved, isLost, isPuzzleLoading } = useGameContext();

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((prev) => !prev);

  useEffect(() => {
    if (isPuzzleLoading) {
      setModalOpen(false);
    }
  }, [isPuzzleLoading]);

  useEffect(() => {
    if (isSolved || isLost) {
      setModalOpen(true);
    }
  }, [isSolved, isLost]);

  const value = {
    isModalOpen,
    toggleModal,
  };

  return (
    <PastPuzzlesResultsContext.Provider value={value}>
      {children}
    </PastPuzzlesResultsContext.Provider>
  );
}
