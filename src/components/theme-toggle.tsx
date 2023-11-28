import { IconButton } from "@mui/material";
import { Brightness4 } from "@mui/icons-material";

export default function ThemeToggle() {
  function handleClick() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "dark";
    }
  }

  return (
    <IconButton size="large" onClick={handleClick} disableRipple>
      <Brightness4 fontSize="large" className="text-black dark:text-white" />
    </IconButton>
  );
}
