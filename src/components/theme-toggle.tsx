import { IconButton } from "@mui/material";
import { Brightness4 } from "@mui/icons-material";

const setTheme = () => {
  if (localStorage.theme === "dark" || !("theme" in localStorage)) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "light";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "dark";
  }
};

export default function ThemeToggle() {
  setTheme();

  function handleClick() {
    setTheme();
  }
  return (
    <IconButton size="large" onClick={handleClick} disableRipple>
      <Brightness4 fontSize="large" className="text-black dark:text-white" />
    </IconButton>
  );
}
