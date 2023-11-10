import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import { BarChart, Close, Share } from "@mui/icons-material";
import { useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StatsModal() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleShare = () => {};

  return (
    <div>
      <IconButton
        size="large"
        onClick={toggleOpen}
        style={{ color: "white" }}
        disableRipple
      >
        <BarChart fontSize="large" />
      </IconButton>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={toggleOpen}
        aria-labelledby="dialog"
        TransitionComponent={Transition}
      >
        <div
          style={{
            width: "540px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <DialogTitle
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <h2>Statistics</h2>
            <IconButton onClick={toggleOpen} disableRipple>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleShare}
              style={{
                display: "flex",
              }}
            >
              Share
              <Share style={{ marginLeft: "1rem" }} />
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
