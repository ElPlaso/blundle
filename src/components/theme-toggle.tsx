import { IconButton } from "@mui/material";
import { Brightness4 } from "@mui/icons-material";
import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

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
    <IconButton size="large" onClick={handleClick} disableRipple>
      <Brightness4 fontSize="large" className="text-black dark:text-white" />
    </IconButton>
  );
}
