import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { LeaderboardOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/utils";
import Modal from "./../shared/Modal";
import Share from "./share";
import Stats from "./stats";
import StatsSubheading from "./stats-subheading";

export default function StatsModal() {
  const { isSolved, isLost } = useGameContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSolved || isLost) {
      setIsOpen(true);
    }
  }, [isSolved, isLost, setIsOpen]);

  return (
    <>
      <Modal
        icon={
          <LeaderboardOutlined
            fontSize="large"
            className="text-black dark:text-white"
          />
        }
        title="STATISTICS"
        isOpen={isOpen}
      >
        <DialogContent className="flex flex-col gap-y-8">
          <DialogContentText className="flex w-full justify-between gap-x-12">
            <Stats />
          </DialogContentText>
          <DialogContentText className="flex flex-col items-center justify-center gap-y-2">
            <StatsSubheading />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Share />
        </DialogActions>
      </Modal>
    </>
  );
}
