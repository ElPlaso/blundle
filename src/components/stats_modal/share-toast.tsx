import { SnackbarContent, Snackbar } from "@mui/material";

export interface ShareToastProps {
  isOpen: boolean;
  onClose?: () => void;
}

const toastStyles = {
  backgroundColor: localStorage.theme === "light" ? "#6aaa64" : "#538d4e",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
};

export default function ShareToast(props: ShareToastProps) {
  const { isOpen, onClose } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      onClose={onClose}
      autoHideDuration={1000}
    >
      <SnackbarContent
        style={toastStyles}
        message="Copied results to clipboard!"
      />
    </Snackbar>
  );
}
