import { useCallback, useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function useTheme() {
  const { mode, setMode } = useContext(ThemeContext);

  const isDark = mode === "dark" ? true : false;

  const toggleTheme= useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, [setMode]);

  return {
    isDark,
    toggleTheme
  }
}
