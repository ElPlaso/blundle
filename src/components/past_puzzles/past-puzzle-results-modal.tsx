import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import { usePastPuzzlesResultsContext } from "../../contexts/utils";
import StatsSubheading from "../stats_modal/stats-subheading";
import NextPuzzleButton from "./next-puzzle-button";
import { Link } from "react-router";
import { Close, Home, SkipNext } from "@mui/icons-material";
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
  const { isModalOpen: isOpen, toggleModal: toggleOpen } =
    usePastPuzzlesResultsContext();

  return (
    <Dialog
      fullScreen={false}
      aria-labelledby="dialog"
      open={isOpen}
      onClose={toggleOpen}
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
        <DialogTitle className="flex items-center justify-between w-full">
          <span className="text-xl font-bold dark:text-white">Results</span>
          <IconButton
            onClick={toggleOpen}
            disableRipple
            className="focus:ring-2 focus:ring-black dark:focus:ring-white"
          >
            <Close className="text-black dark:text-white" />
          </IconButton>
        </DialogTitle>
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
