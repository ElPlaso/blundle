import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/utils";
import StatsSubheading from "../stats_modal/stats-subheading";
import NextPuzzleButton from "./next-puzzle-button";
import { Link } from "react-router";
import { Home, SkipNext } from "@mui/icons-material";
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

export default function PastPuzzleResultsModal() {
  const { isSolved, isLost, isPuzzleLoading } = useGameContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isPuzzleLoading) {
      setIsOpen(false);
    }
  }, [isPuzzleLoading]);

  useEffect(() => {
    if (isSolved || isLost) {
      setIsOpen(true);
    }
  }, [isSolved, isLost]);

  return (
    <Dialog
      fullScreen={false}
      aria-labelledby="dialog"
      open={isOpen}
      TransitionComponent={Transition}
      style={{
        color: localStorage.theme == "light" ? "white" : "#212121",
      }}
      className="transition-all duration-300"
    >
      <style>
        {`
            .MuiPaper-root { 
              background-color: ${
                localStorage.theme === "light" ? "#f0f3f3" : "#121212"
              };
            `}
      </style>
      <div className="flex flex-col items-center mb-4 max-sm:w-full md:w-96">
        <DialogContent className="flex flex-col w-full gap-y-8">
          <DialogContentText className="flex flex-col items-center justify-center gap-y-2">
            <StatsSubheading />
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex flex-col gap-y-2">
          <NextPuzzleButton className="flex justify-center w-48 py-2 text-sm font-bold text-center text-white rounded-full gap-x-2 enabled:bg-lightCorrect disabled:cursor-not-allowed disabled:bg-lightAbsent enabled:dark:bg-darkCorrect dark:disabled:bg-darkAbsent">
            Next Puzzle
            <SkipNext />
          </NextPuzzleButton>
          <Link to="/">
            <button className="flex justify-center w-48 py-2 text-sm font-bold text-center text-white rounded-full gap-x-2 enabled:bg-lightPresent disabled:cursor-not-allowed disabled:bg-lightAbsent enabled:dark:bg-darkPresent dark:disabled:bg-darkAbsent">
              Home
              <Home />
            </button>
          </Link>
        </DialogActions>
      </div>
    </Dialog>
  );
}
