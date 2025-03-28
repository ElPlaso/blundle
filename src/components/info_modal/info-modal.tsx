import { DialogContent, DialogContentText } from "@mui/material";
import { HelpOutline } from "@mui/icons-material";
import Modal from "../shared/Modal";
import ResultExample from "./result-example";
import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/utils";

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSolved, isLost, currentPosition } = useGameContext();

  useEffect(() => {
    if (!isSolved && !isLost && currentPosition) {
      setIsOpen(true);
    }
  }, [isSolved, isLost, currentPosition, setIsOpen]);

  return (
    <Modal
      icon={
        <HelpOutline fontSize="large" className="text-black dark:text-white" />
      }
      title="How To Play"
      isOpen={isOpen}
    >
      <DialogContent className="flex w-full flex-col gap-y-4">
        <span className="text-sm text-lightAbsent dark:text-white">
          Solve the <b>Chess Puzzle</b> in 6 tries
        </span>
        <span className="flex flex-col text-sm text-lightAbsent">
          <ul className="ml-4 flex list-disc flex-col gap-y-2">
            <li>Click to move pieces</li>
            <li>Find the best moves (including opponent moves)</li>
            <li>Each move must be a legal move in the position</li>
            <li>
              Each move is notated in{" "}
              <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)"
                className="font-bold hover:underline"
              >
                SAN
              </a>{" "}
              notation
            </li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the solution
            </li>
          </ul>
        </span>
        <DialogContentText className="flex flex-col gap-y-2">
          <span className="font-bold text-black dark:text-white">Examples</span>
          <span className="flex flex-col gap-y-2 text-sm text-lightAbsent">
            <ResultExample
              moves={["e4", "e5", "Nf3"]}
              type="Correct"
              position={0}
            />
            <ResultExample
              moves={["e4", "e5", "Nf3"]}
              type="Present"
              position={1}
            />
            <ResultExample
              moves={["e4", "e5", "Nf3"]}
              type="Absent"
              position={2}
            />
          </span>
        </DialogContentText>
        <DialogContentText>
          <div className="border-t pt-2 text-sm text-lightAbsent dark:border-darkAbsent">
            There is a new puzzle daily courtesy of
            <a
              target="_blank"
              href="https://rapidapi.com/KeeghanM/api/chess-puzzles"
              className="ml-1 font-bold hover:underline"
            >
              this
            </a>
            <a
              target="_blank"
              href="https://lichess.org/"
              className="m-1 font-bold hover:underline"
            >
              lichess
            </a>
            api
          </div>
        </DialogContentText>
      </DialogContent>
    </Modal>
  );
}
