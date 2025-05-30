import { IconButton } from "@mui/material";
import { Brightness4Outlined } from "@mui/icons-material";

export default function ThemeToggle() {
  function handleClick() {
    if (localStorage.theme === "light" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }

  return (
    <IconButton
      size="small"
      onClick={handleClick}
      disableRipple
      className="focus:ring-2 focus:ring-black dark:focus:ring-white"
    >
      <Brightness4Outlined
        fontSize="large"
        className="text-black dark:text-white"
      />
    </IconButton>
  );
}
