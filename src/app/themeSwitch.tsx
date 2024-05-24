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
    <>
      {/* <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}
      <Dropdown
        label={theme === "dark" ? <IoSunny size={25} /> : <IoMoon size={25} />}
        arrowIcon={false}
        dismissOnClick={true}
        color={""}
        size={"xs"}
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
    </>
  );
};
