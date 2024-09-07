"use client";
import { useTheme } from "next-themes";

export const useSwitchTheme = () => {
  const { theme, setTheme } = useTheme();

  const switchLight = () => setTheme("light");
  const switchDark = () => setTheme("dark");
  const switchSystem = () => setTheme("system");

  return { theme, switchLight, switchDark, switchSystem };
};
