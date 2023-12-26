import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";

export interface ModalProps {
  icon: ReactElement;
  title: string;
  children?: ReactNode;
  isOpen?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props: ModalProps) {
  const { icon, title, children, isOpen = false } = props;

  const [open, setOpen] = useState(isOpen);

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <IconButton size="small" onClick={toggleOpen} disableRipple>
        {icon}
      </IconButton>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={toggleOpen}
        aria-labelledby="dialog"
        TransitionComponent={Transition}
        style={{
          color: localStorage.theme == "light" ? "white" : "#212121",
        }}
      >
        <style>
          {`
            .MuiPaper-root { 
              background-color: ${
                localStorage.theme === "light" ? "#f0f3f3" : "#121212"
              };
            `}
        </style>
        <div className="md:w-[504px] max-sm:w-[238px] flex flex-col items-center mb-4">
          <DialogTitle className="flex w-full justify-between items-center">
            <span className="text-xl font-bold dark:text-white">{title}</span>
            <IconButton onClick={toggleOpen} disableRipple>
              <Close className="text-black dark:text-white" />
            </IconButton>
          </DialogTitle>
          {children}
        </div>
      </Dialog>
    </div>
  );
}
