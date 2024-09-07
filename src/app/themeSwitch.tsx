"use client";
import { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import { useSwitchTheme } from "@/hooks/useSwitchTheme";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, switchLight, switchDark, switchSystem } = useSwitchTheme();

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
      <Dropdown.Item icon={IoSunny} onClick={switchLight}>
        Light
      </Dropdown.Item>
      <Dropdown.Item icon={IoMoon} onClick={switchDark}>
        Dark
      </Dropdown.Item>
      <Dropdown.Item icon={RiComputerFill} onClick={switchSystem}>
        System
      </Dropdown.Item>
    </Dropdown>
  );
};
