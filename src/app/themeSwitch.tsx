"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Dropdown } from "flowbite-react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown
      label={
        {
          light: <IoMoon className="size-7" />,
          dark: <IoSunny className="size-7" />,
          system: window.matchMedia("(prefers-color-scheme: dark)").matches ? (
            <IoSunny className="size-7" />
          ) : (
            <IoMoon className="size-7" />
          ),
        }[theme!]
      }
      arrowIcon={false}
      dismissOnClick={true}
      color={""}
    >
      <Dropdown.Item icon={IoSunny} onClick={() => setTheme("light")}>
        Light
      </Dropdown.Item>
      <Dropdown.Item icon={IoMoon} onClick={() => setTheme("dark")}>
        Dark
      </Dropdown.Item>
      <Dropdown.Item icon={RiComputerFill} onClick={() => setTheme("system")}>
        System
      </Dropdown.Item>
    </Dropdown>
  );
};
