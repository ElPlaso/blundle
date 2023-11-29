import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import { Close, HelpOutline } from "@mui/icons-material";
import { useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoModal() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <IconButton size="small" onClick={toggleOpen} disableRipple>
        <HelpOutline fontSize="large" className="text-black dark:text-white" />
      </IconButton>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={toggleOpen}
        aria-labelledby="dialog"
        TransitionComponent={Transition}
      >
        <div className="lg:w-[504px] flex flex-col items-center">
          <style>
            {`
            .MuiPaper-root { 
              background-color: ${
                localStorage.theme === "light" ? "white" : "#121212"
              };
            `}
          </style>
          <DialogTitle className="flex w-full justify-between items-start">
            <div>
              <h1 className="text-xl font-bold dark:text-white max-sm:text-lg pt-1.5">
                How To Play
              </h1>
              <h2 className="text-lightAbsent text-sm">
                Solve the <b>Chess Puzzle</b> in 6 tries
              </h2>
            </div>
            <IconButton onClick={toggleOpen} disableRipple>
              <Close className="text-black dark:text-white" />
            </IconButton>
          </DialogTitle>
          <DialogContent className="flex flex-col w-full gap-y-4">
            <DialogContentText>
              <div className="text-lightAbsent text-sm flex flex-col">
                <ul className="list-disc ml-4 gap-y-2 flex flex-col">
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
                    The color of the tiles will change to show how close your
                    guess was to the solution
                  </li>
                </ul>
              </div>
            </DialogContentText>
            <DialogContentText className="flex flex-col gap-y-2">
              <h3 className="font-bold text-black dark:text-white">Examples</h3>
              <div className="text-lightAbsent flex flex-col gap-y-2 text-sm">
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
              </div>
            </DialogContentText>
            <DialogContentText className="flex flex-col gap-y-2">
              <div className="text-lightAbsent flex flex-col border-t pt-4 dark:border-darkAbsent text-sm">
                There is a new puzzle daily courtesy of
                <a
                  target="_blank"
                  href="https://lichess.org/"
                  className="font-bold hover:underline"
                >
                  lichess.org
                </a>
              </div>
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

function ResultExample(props: {
  moves: string[];
  position: number;
  type: "Correct" | "Present" | "Absent";
}) {
  const { moves, position, type } = props;

  const subtitle = {
    Correct: "is in the solution and in the correct spot.",
    Present: "is in the solution but in the wrong spot.",
    Absent: "is not in the solution.",
  };

  return (
    <div className="text-lightAbsent flex flex-col gap-y-1">
      <div className="flex text-white gap-x-2">
        {moves.map((move, index) => (
          <div
            className={`p-2 rounded w-16 items-center flex font-bold justify-center ${
              index === position
                ? `bg-light${type} dark:bg-dark${type}`
                : `bg-white text-lightAbsent dark:text-white dark:bg-darkBackground border-2 border-lightAbsetn dark:border-darkAbsent`
            }`}
          >
            {move}
          </div>
        ))}
      </div>
      <div>
        <b>{moves[position]}</b> {subtitle[type]}
      </div>
    </div>
  );
}
